import { getPlainActions } from 'dk-react-mobx-globals';

import { transformers } from 'compSystem/transformers';
import { TypeGlobals } from 'models';
import { createError } from 'utils/system/createError';
import { errorsNames } from 'const';

export function waitActionsToBeCompleted(context: TypeGlobals) {
  let timout: ReturnType<typeof setTimeout>;

  return new Promise<void>((resolve, reject) => {
    const disposer = transformers.autorun(() => {
      /**
       * Actions are extendable, so have to loop every time
       *
       */

      const plainApi = Object.values(context.api);
      const plainActions = getPlainActions(context.actions);
      const someActionIsExecuting =
        plainActions.some((fn) => fn.state.isExecuting) ||
        plainApi.some((fn) => fn.state.isExecuting);

      /**
       * At first actions are executed in two ways:
       * - before rendering of React app to collect some useful data
       * - in componentWillMount lifecycle
       *
       */

      if (!someActionIsExecuting) {
        clearTimeout(timout);
        timout = setTimeout(() => {
          disposer();

          const actionWithError =
            plainActions.find((fn) => fn.state.errorName === errorsNames.REDIRECT) ||
            plainActions.find((fn) => fn.state.error);

          if (actionWithError) {
            reject(
              createError(
                actionWithError.state.errorName || errorsNames.INTERNAL_SERVER_ERROR,
                actionWithError.state.error!
              )
            );
          } else {
            resolve();
          }
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        }, 10);
      } else {
        clearTimeout(timout);
      }
    });
  });
}
