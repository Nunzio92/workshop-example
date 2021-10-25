import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { AppSelectors } from '../../../core/app-store/app.selector';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../../../core/app-store/app.action';
import { Feature1Selectors } from '../store/feature1.selector';
import { Model1 } from '../store/feature1.reducer';
import { getModel1 } from '../store/feature1.action';
import { take, takeUntil } from 'rxjs/operators';
import { StoreDevtools } from '@ngrx/store-devtools';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { herPure } from '../../../core/pure';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  loadingState$: Observable<boolean>;
  href = "";
  storeDevToolIsPresent: boolean;
  model1$: Observable<Model1[] | null>;
  form1: FormGroup;
  testValue = {val: 0};

  constructor(private store: Store,
              private feature1Selector: Feature1Selectors,
              @Optional() private storeDevTool: StoreDevtools,
              private fb: FormBuilder,
              private http: HttpClient,
              private appSelector: AppSelectors) {
    this.loadingState$ = this.appSelector.loadingState$;
    this.storeDevToolIsPresent = !!this.storeDevTool;
    this.model1$ = this.feature1Selector.model1$;


    this.form1 = this.fb.group({
      filterValue: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.storeDevToolIsPresent) {
      this.storeDevTool.liftedState.pipe(takeUntil(this.onDestroy$)).subscribe(v => {
        this.href = "data:text/json;charset=utf-8," + JSON.stringify({...v});
      });
    }
    this.http.get('gusConfig/getFlussiCustomizzabili').subscribe()
  }

  @herPure
  get getTestValue(){
    return this.testValue.val;
  }

  setNewVal(){
    this.testValue = {...this.testValue, val: this.testValue.val+1};
  }

  downloadModel1() {
    this.store.dispatch(getModel1());
  }

  logUrl() {
    this.appSelector.currentUrl$.pipe(take(1)).subscribe(v => console.log(v));
  }


  getDebuggingLog() {
    // this.bugReporService.getActionStack().subscribe(v => {
    //   console.log(v);
    // });

    if (this.storeDevToolIsPresent) {
      this.storeDevTool.liftedState.pipe(take(1)).subscribe(v => {
        console.log(v);
      });
    }
  }

  startLoading() {
    this.store.dispatch(startLoading());
  }

  stopLoading() {
    this.store.dispatch(stopLoading());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
