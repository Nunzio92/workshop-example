export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        const msg = `${moduleName} has already been loaded. This module can be imported only once.`;
        throw new Error(msg);
    }
}
