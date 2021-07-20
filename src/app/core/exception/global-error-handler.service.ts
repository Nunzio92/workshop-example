import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor() {
  }

  handleError(error: Error | HttpErrorResponse) {
    if (!(error instanceof HttpErrorResponse)) {
      // your custom error handling logic for client side error
      console.log(`[ERROR handler]: ${error}`);
    }

    // Always log errors
    console.error(error);
  }
}
