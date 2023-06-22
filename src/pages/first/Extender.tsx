import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { ModularStoresSetter } from 'compSystem/ModularStoresSetter';

import modularStores from './store';
import * as modularActions from './actions';
import { First } from './First';

const pageName = __dirname.split(PATH_SEP).pop() as string;

// eslint-disable-next-line import/no-default-export
export default class Extender extends ConnectedComponent {
  render() {
    return (
      <ModularStoresSetter
        stores={{ [pageName]: modularStores }}
        actions={{ [pageName]: modularActions }}
      >
        <First {...this.props} />
      </ModularStoresSetter>
    );
  }
}