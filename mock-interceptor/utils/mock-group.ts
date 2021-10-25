import { SomeKeyOfType } from './typeTranformation.type';
import { RequestMethodType } from '../http-mock-factory';

export class MockGroup {

  constructor(mockName: string, values: SomeKeyOfType<RequestMethodType, object>) {

    return Object.keys(values).reduce((accumulatore, current) =>
      ({
        ...accumulatore, ...{
          // @ts-ignore
          [current]: Object.keys(values[current]).reduce((acc, curr) => {
            // @ts-ignore
            return {...acc, ...{[curr]: {value: values[current][curr], enabled: true, mockName: mockName}}}
          }, {})
        }
      }), {});
  }
}
