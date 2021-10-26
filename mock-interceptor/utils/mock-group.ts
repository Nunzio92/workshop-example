import { SomeKeyOfType } from './typeTranformation.type';
import { RequestMethodType } from '../http-mock-factory';

export type MappedMock = {[key: string]: { value: any, enabled: boolean, mockName: string }}

export function createMockGroup(mockName: string, values: SomeKeyOfType<RequestMethodType>): SomeKeyOfType<RequestMethodType, MappedMock> {
  let returnObject = (Object.keys(values) as RequestMethodType[]).reduce((accReqMet, currReqMet) =>
    ({...accReqMet, ...{
        [currReqMet]: Object.keys(values[currReqMet]).reduce((acc, curr) => {
          return {...acc, ...{[curr]: {value: values[currReqMet][curr], enabled: true, mockName: mockName}}}
        }, {})
      }
    }), {});
  Object.defineProperty(returnObject, '_mockName', {value: mockName, enumerable: false})
  return returnObject;
}
