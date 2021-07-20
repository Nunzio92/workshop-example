import { Component, Optional } from '@angular/core';
import { StoreDevtools } from '@ngrx/store-devtools';
import { AppSelectors } from './core/app-store/app.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean>;

  constructor(@Optional() private storeDevTool: StoreDevtools,
              private appSelector: AppSelectors) {
    this.loading$ = this.appSelector.loadingState$;
  }

}
