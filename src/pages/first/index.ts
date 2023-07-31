import { default as store } from './store';
import * as actions from './actions';
import { First } from './First';

export const pageName = __dirname.split(PATH_SEP).pop();

export { store, actions };

// eslint-disable-next-line import/no-default-export
export default First;
