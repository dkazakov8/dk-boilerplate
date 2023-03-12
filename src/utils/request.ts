import { AxiosError } from 'axios';
import { request as requestRaw } from 'dk-request';
import { TypeCreateContextParams } from 'dk-react-mobx-globals';

import { env } from 'env';

import { generateUUID } from './generateUUID';

export const request: TypeCreateContextParams['request'] = (params) => {
  const host = IS_CLIENT ? window.SERVER_CONFIG.API_HOST : env.API_HOST_SERVER;

  const headers = Object.assign(
    {
      platform: 'web',
      version: env.GIT_COMMIT,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Idempotency-Key': generateUUID(),
    },
    params.headers
  );

  return requestRaw({
    ...params,
    headers,
    disableCredentials: true,
    url: (requestParams: any) => {
      if (typeof params.url === 'function') return host + params.url(requestParams);

      return host + params.url;
    },
    extraneousLogger: ({ extraneousPaths }) => {
      console.warn(`Omitted extraneous ${JSON.stringify(extraneousPaths)} for "${params.apiName}"`);
    },
    afterRequestInterceptor: () => {
      return Promise.resolve();
    },
  }).catch((error: Error | AxiosError) => {
    throw error;
  });
};
