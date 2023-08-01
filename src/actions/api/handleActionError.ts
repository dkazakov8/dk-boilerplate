import { AxiosError } from 'axios';
import { errorActionCanceledName } from 'dk-react-mobx-globals';

import { TypeAction } from 'models';
import { errorsNames } from 'const';
import { createError } from 'utils';
import { routes } from 'routes';

type TypeParams = {
  error: Error | AxiosError;
  message: string;
  redirectRoute?: string;
};

const handleAxiosError: TypeAction<TypeParams> = (globals, params) => {
  const { actions } = globals;
  const { error, message, redirectRoute } = params;

  const axiosError = error as AxiosError;

  const traceId = axiosError.response?.headers?.['trace-id'];
  const response = axiosError.response?.data || {};
  const method = axiosError.request?.method || axiosError.response?.config.method || 'GET';
  const url = axiosError.request?.path || axiosError.request?.responseURL;

  const msg = [
    axiosError.message,
    JSON.stringify(response),
    `${method} ${url}`,
    redirectRoute ? `redirected to ${redirectRoute}` : null,
    `trace-id ${traceId}`,
  ]
    .filter((str) => str != null)
    .join(' | ');

  console.error(createError(errorsNames.AXIOS_ERROR, msg));

  void actions.ui.notificationRaise({ type: 'error', message, delay: 5000 });

  return Promise.reject(redirectRoute ? createError(errorsNames.REDIRECT, redirectRoute) : error);
};

const handleRedirectError: TypeAction<TypeParams> = (globals, params) => {
  const { actions } = globals;
  const { error, message, redirectRoute } = params;

  /**
   * Redirect may be already called with another redirectRoute
   * if handleActionError has inner level handleActionError
   *
   */

  const routesPaths = Object.values(routes).map((route) => route.path);

  if (routesPaths.includes(error.message as any)) return Promise.resolve();

  if (IS_CLIENT) {
    console.error(error);

    void actions.ui.notificationRaise({
      type: 'error',
      message: `${message}: ${error.message}`,
      delay: 5000,
    });
  }

  return Promise.reject(createError(errorsNames.REDIRECT, redirectRoute || routes.error500.path));
};

/**
 * WARNING: for redirects use createError(errorsNames.REDIRECT, message) where
 * message is custom! For actual redirect redirectRoute is used
 *
 */

export const handleActionError: TypeAction<TypeParams> = (globals, params) => {
  const { actions, req } = globals;
  const { error, message, redirectRoute } = params;

  // Skip intentionally interrupted actions

  if (error.name === errorActionCanceledName) return Promise.resolve();

  // Request errors

  if ((error as AxiosError).isAxiosError) return handleAxiosError(globals, params);

  // Intentional redirect

  if (error.name === errorsNames.REDIRECT) return handleRedirectError(globals, params);

  // Unknown

  console.error(error);

  void actions.ui.notificationRaise({ type: 'error', message, delay: 5000 });

  if (redirectRoute && req) {
    req.originalUrl = redirectRoute;

    return Promise.resolve();
  }

  return Promise.reject(error);
};
