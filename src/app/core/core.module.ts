import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { ExceptionModule } from './exception/exception.module';
import { AppStoreModule } from './app-store/app-store.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExceptionModule,
    AppStoreModule,
  ],
  exports: [],
  providers: []
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
