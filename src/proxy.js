// @flow

import AsyncStorageMock from './AsyncStorageMock';

const returns: Map<string, any> = new Map()

const handler = {
  get(target: Object, propKey: string) {
    const origin = target[propKey];
    if (typeof origin !== 'function') {
      return origin
    }

    return async function (...args) {
      const ret = returns.get(propKey);
      
      if (!ret) {
        return origin.apply(this, args);
      }

      const errback = args.find(a => typeof a === 'function');
      if (typeof ret === Error) {
        if (errback) {
          errback(ret, null);
        }
        throw ret
      } else {
        if (errback) {
          errback(null, ret);
        }
        return ret
      }
    }
  }
};

const proxy: AsyncStorageMock = new Proxy(new AsyncStorageMock(), handler)

export const willThrow = (fn: string, err: Error) => returns.set(fn, err)

export const willReturn = (fn: string, value: any) => returns.set(fn, value)

export default proxy;
