import { createBrowserHistory } from 'history';

/**
 * @docs: https://github.com/ReactTraining/history
 *
 */

export const history: ReturnType<typeof createBrowserHistory> = IS_CLIENT
  ? createBrowserHistory()
  : null!;
