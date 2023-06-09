import { ActionsLogger as ActionsLoggerRaw } from 'dk-react-mobx-globals-logger';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

import './ActionsLogger.scss';

// eslint-disable-next-line import/no-default-export
export default class ActionsLogger extends ConnectedComponent {
  render() {
    const { store } = this.context;

    return <ActionsLoggerRaw actionsLogs={store.router.actionsLogs} transformers={transformers} />;
  }
}
