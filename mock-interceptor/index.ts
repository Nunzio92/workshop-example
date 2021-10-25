
import { MockInterceptorModule } from './mock-interceptor.module';

export * from './mock-interceptor.module';

export const devDep = [
  MockInterceptorModule.forRoot()
];
