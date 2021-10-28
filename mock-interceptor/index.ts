import { MockInterceptorModule } from './mock-interceptor.module';
import { ADVANCEDGUSIMPORTMOCK } from './mocks/advanced-gus-import.mock';
import { MOCKFEEDBACK } from './mocks/feedback-prodotto.mock';
import { QUESTIONARIPRODOTTOMOCK } from './mocks/questionari-prodotto.mock';

export * from './mock-interceptor.module';

// this file must be replaced with index.prod.ts during production build
export const HttpMockModule = [
  MockInterceptorModule.forRoot([ADVANCEDGUSIMPORTMOCK, MOCKFEEDBACK, QUESTIONARIPRODOTTOMOCK])
];

