// per passare da interfaccia a costanti assicurandosi che le chiavi presenti siano IDENTICHE
export type AllKeyOfInterface<T, VAL = any> = { [key in keyof Required<T>]: VAL }; // equal to Record<T, VAL>
export type SomeKeyOfInterface<T, VAL = any> = { [key in keyof Required<T>]?: VAL };

// per passare da type condizionale a costante assicurandosi che siano presenti tutte le chiavi
export type AllKeyOfType<T extends string | number, VAL = any> = { [key in T]: VAL };
export type SomeKeyOfType<T extends string | number, VAL = any> = { [key in T]?: VAL };

export enum RequestMethods {
  GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE', OPTIONS = 'OPTIONS', HEAD = 'HEAD', PATCH = 'PATCH'
}

export type RequestMethodType = keyof typeof RequestMethods;

export interface MappedMock {
  [key: string]: { value: any, enabled: boolean, mockName: string }
}
