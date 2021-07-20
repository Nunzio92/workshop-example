import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './global-error-handler.service';
import { throwIfAlreadyLoaded } from '../guards/module-import-guard';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {provide: ErrorHandler, useClass: GlobalErrorHandler},
    ]
})
export class ExceptionModule {

    constructor(@Optional() @SkipSelf() parentModule: ExceptionModule) {
        throwIfAlreadyLoaded(parentModule, 'ExceptionModule');
    }

}
