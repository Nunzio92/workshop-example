export class ObjectUtility {

  /**
   * Deep clone function
   * source input object to copy/clone
   */
  public static deepClone<T = any>(source: T): T {
    if (source === null || source === undefined) {
      return source;
    }
    if (source instanceof Date) {
      return new Date(source.getTime()) as any;
    }
    if (Array.isArray(source)) {
      const cp = [] as any[];
      (source as any[]).forEach((v) => {
        cp.push(v);
      });
      return cp.map((n: any) => this.deepClone<any>(n)) as any;
    }
    if (this.isObject(source)) {
      const cp = {...(source as { [key: string]: any })} as { [key: string]: any };
      Object.keys(cp).forEach(k => {
        cp[k] = this.deepClone<any>(cp[k]);
      });
      return cp as T;
    }
    return source;
  }

  public static isObject(item: any): boolean {
    return (item && typeof item === 'object' && item !== {} && !Array.isArray(item));
  }

}
