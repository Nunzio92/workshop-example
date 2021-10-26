import { Inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { AllKeyOfType, SomeKeyOfType } from './utils/typeTranformation.type';
import { CloneUtil } from './utils/clone-util';
import { MockWidgetService } from './widget/mock-widget.service';
import { MOCKS_GROUPS } from './mock-interceptor.module';
import { MappedMock } from './utils/mock-group';

enum RequestMethods {
  GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE', OPTIONS = 'OPTIONS', HEAD = 'HEAD', PATCH = 'PATCH'
}

export type RequestMethodType = keyof typeof RequestMethods;

/**
 * inside the mock file can be used ** for dynamic params ex: myurl/api1/dettaglio/**
 */
@Injectable()
export class HttpMockFactory implements HttpInterceptor {
  myMock: AllKeyOfType<RequestMethodType, MappedMock>;
  myMockKeys: AllKeyOfType<RequestMethodType, string[]>;

  constructor(private mockWidgetService: MockWidgetService,
              @Inject(MOCKS_GROUPS) private mockGroups: SomeKeyOfType<RequestMethodType>[]) {
    if (mockGroups.length === 0) {
      throw new Error('MockInterceptor is enabled but no mocks are provided! Inject some mock through MOCKS_GROUPS token.');
    }
    // Merge all mock files and generate a smaller structure that contains all mocks url divided for RequestMethods
    this.myMock = HttpMockFactory.mergeMockSmart(this.mockGroups);
    this.mockWidgetService.initMockList(this.myMock);
    this.myMockKeys = HttpMockFactory.extractOrderedKeys(this.myMock);
  }

  private static extractOrderedKeys(object: AllKeyOfType<RequestMethodType, MappedMock>): AllKeyOfType<RequestMethodType, string[]> {
    return (Object.keys(object) as RequestMethodType[]).reduce((accumulator, currentValue) => {
      let keys = Object.keys(object[currentValue]);
      return {...accumulator, [currentValue]: HttpMockFactory.moveGenericKeys(keys)};
    }, {}) as AllKeyOfType<RequestMethodType, string[]>;
  }


  private static moveGenericKeys(keys: string[]): string [] {
    let keysToMove: string[] = [];
    keys.forEach((key, index) => {
      if (key.indexOf('**') > -1) {
        keysToMove.push(keys.splice(index, 1)[0]);
      }
    });
    return [...keys, ...keysToMove];
  }


  private static mergeMockSmart(mockGroups: SomeKeyOfType<RequestMethodType, MappedMock>[]): AllKeyOfType<RequestMethodType, MappedMock> {
    return mockGroups.reduce((accumulator, currentValue) => {
      (Object.keys(RequestMethods) as RequestMethodType[]).forEach(v => {
        accumulator = {...accumulator, [v]: {...accumulator[v], ...currentValue[v]}};
      });
      return accumulator;
    }) as AllKeyOfType<RequestMethodType, MappedMock>;
  }

  // private static mergeMockSmart(...objs: SomeKeyOfType<RequestMethodType, {}>[]): SomeKeyOfType<RequestMethodType, {}> {
  //   return objs.reduce((accumulator: any, currentValue: any) => {
  //     Object.keys(RequestMethods).forEach(v => {
  //       let newValue = currentValue[v] ? Object.keys(currentValue[v]).reduce((acc: any, curr: any) =>
  //         ({...acc, ...{[curr]: {value: currentValue[v][curr], enabled: true, mockName: 'test'}}}), {}) : {}
  //       accumulator = {...accumulator, [v]: {...accumulator[v], ...newValue}};
  //     });
  //     return accumulator;
  //   });
  // }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(
        mergeMap(() => this.handleRoute(request, next)),
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        materialize(),
        delay(200),
        dematerialize(),
      );
  }

  handleRoute(request: HttpRequest<any>, next: HttpHandler) {
    let {url, method, headers, body} = request;

    // replace ** with regexp (.*|.*/) for metch all dynamic parameter in the url
    // @ts-ignore
    let keyOfResponse = this.myMockKeys[method]?.find((key: string) => {
      let regExp = new RegExp(key.replace('**', '(.*|.*/)') + '$');
      return regExp.test(url);
    }) || '';
    // @ts-ignore
    let mockedResponse = this.myMock[method][keyOfResponse]?.enabled ? this.myMock[method][keyOfResponse].value : null;

    if (!!mockedResponse) {
      console.log(`%c[mock] intercept request to ${url} with this body`, 'background: #222; color: #bada55', body);
      const status = mockedResponse.success === true ? 200 : 500;
      console.log('%c[mock] response', 'background: #222; color: #bada55', mockedResponse);
      // is required to deep clone the response for immutability principle!! we can face some issue on returning the same object reference,
      // spread or object.assign is not enough for deep nested object
      let deepClonedResp = CloneUtil.deepClone(mockedResponse); // for deepclone can be used any library like lodash or JSON.parse(JSON.stringify(obj))
      return !!status && status !== 200 ?
        throwError(new HttpErrorResponse({status, url, error: deepClonedResp || {}})) :
        of(new HttpResponse({status, body: deepClonedResp || {}}));
    } else {
      return next.handle(request);
    }
  }
}
