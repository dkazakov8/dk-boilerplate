import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { ModularStoresSetter } from 'compSystem/ModularStoresSetter';

import { Error, PropsErrorPage } from './Error';

export type { PropsErrorPage };

// eslint-disable-next-line import/no-default-export,import/no-unused-modules
export default class Extender extends ConnectedComponent<PropsErrorPage> {
  render() {
    return (
      <ModularStoresSetter>
        <Error {...this.props} />
      </ModularStoresSetter>
    );
  }
}
