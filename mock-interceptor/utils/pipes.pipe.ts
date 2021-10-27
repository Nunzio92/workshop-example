import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keyValuePipe', pure: true})
export class KeyValuePipe implements PipeTransform {

  transform<T extends string, G>(obj: { [key in T]?: G }): { key: T, value: G }[] {
    return Object.keys(obj).map((key) => ({key: key as T, value: (obj as any)[key]}));
  }
}

@Pipe({name: 'extractNonEnumerable', pure: true})
export class ExtractNonEnumerable implements PipeTransform {

  transform(obj: any, paramName: string) {
    return obj[paramName];
  }
}

@Pipe({name: 'mapper'})
export class MapperPipe implements PipeTransform {
  /**
   * Maps object to an arbitrary result through a mapper function
   *
   * @param value an item to transform
   * @param mapper a mapping function
   * @param args arbitrary number of additional arguments
   */
  transform<T, G>(value: T, mapper: TuiMapper<T, G>, ...args: any[]): G {
    return mapper(value, ...args);
  }
}

/**
 * Typed mapping function.
 */
export type TuiMapper<T, G> = (item: T, ...args: any[]) => G;
