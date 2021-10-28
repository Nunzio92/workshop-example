import { Injectable } from '@angular/core';
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
import { AllKeyOfType, MappedMock, RequestMethodType } from './utils/models';
import { CloneUtil } from './utils/clone-util';
import { HttpMockService } from './http-mock.service';


/**
 * inside the mock file can be used ** for dynamic params ex: myurl/api1/dettaglio/**
 */
@Injectable()
export class HttpMockFactory implements HttpInterceptor {
  private _myMockKeys: AllKeyOfType<RequestMethodType, string[]>;

  constructor(private mockWidgetService: HttpMockService,) {
    // Generate iterable structure for easy regex test
    this._myMockKeys = HttpMockFactory.extractOrderedKeys(this.mockWidgetService.myMock);
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
    let keyOfResponse = this._myMockKeys[(method as RequestMethodType)]?.find((key: string) => {
      let regExp = new RegExp(key.replace('**', '(.*|.*/)') + '$');
      return regExp.test(url);
    }) || '';
    let mockedResponse = this.mockWidgetService.myMock[(method as RequestMethodType)][keyOfResponse]?.enabled ?
      this.mockWidgetService.myMock[(method as RequestMethodType)][keyOfResponse].value : null;

    if (!!mockedResponse) {
      console.log(`%c[mock] intercept request to ${url} with this body`, 'background: #222; color: #bada55', body);
      const status = mockedResponse.success === true ? 200 : 500;
      console.log('%c[mock] response', 'background: #222; color: #bada55', mockedResponse);
      // is required to deep clone the response for immutability principle!! we can face some issue on returning the same object reference,
      // spread or object.assign is not enough for deep nested object
      let deepClonedResp = CloneUtil.deepClone(mockedResponse); // for deepclone can be used any library like lodash or JSON.parse(JSON.stringify(obj))
     // adapt logic to api structure!
      return !!status && status !== 200 ?
        throwError(new HttpErrorResponse({status, url, error: deepClonedResp || {}})) :
        of(new HttpResponse({status, body: deepClonedResp || {}}));
    } else {
      return next.handle(request);
    }
  }
}
