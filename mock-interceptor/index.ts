
import { MockInterceptorModule, MOCKS_GROUPS } from './mock-interceptor.module';
import { ADVANCEDGUSIMPORTMOCK } from './mocks/advanced-gus-import.mock';
import { MOCKFEEDBACK } from './mocks/feedback-prodotto.mock';
import { QUESTIONARIPRODOTTOMOCK } from './mocks/questionari-prodotto.mock';

export * from './mock-interceptor.module';

export const HttpMockModule = [
  MockInterceptorModule.forRoot([ADVANCEDGUSIMPORTMOCK, MOCKFEEDBACK, QUESTIONARIPRODOTTOMOCK])
];

