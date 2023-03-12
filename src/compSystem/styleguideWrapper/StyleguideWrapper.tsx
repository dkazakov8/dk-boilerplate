import 'styles/global.scss';
import './StyleguideWrapper.scss';

import { themes } from 'const';
import { isomorphPolyfills } from 'utils';

import { createGlobals } from '../createGlobals';
import { ConnectedComponent } from '../ConnectedComponent';
import { StoreContext } from '../StoreContext';

isomorphPolyfills();

const globals = createGlobals();

// eslint-disable-next-line import/no-default-export,import/no-unused-modules
export default class StyleguideWrapper extends ConnectedComponent {
  render() {
    return (
      <StoreContext.Provider value={globals}>
        <div style={themes.light as any}>{this.props.children}</div>
      </StoreContext.Provider>
    );
  }
}
