/* eslint-disable react/jsx-handler-names */

import { transformers } from 'compSystem/transformers';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Counter } from 'comp/counter';

import { messages } from './messages';
import styles from './First.scss';

export { default as store } from './store';
export * as actions from './actions';

const DELAY = 1000;

// eslint-disable-next-line import/no-default-export
export default class First extends ConnectedComponent {
  localTimeout?: ReturnType<typeof setTimeout> = undefined;

  localState = transformers.observable({
    localCounter: 0,
    isLoading: false,
  });

  UNSAFE_componentWillMount() {
    const { actions, store } = this.context;

    void actions.routing.setMetaData({ title: messages.title, description: messages.description });

    if (!IS_CLIENT) {
      transformers.batch(() => {
        store.pages.first.modularCounter = 1;
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.localTimeout!);
  }

  handleIncrease = () => {
    transformers.batch(() => {
      this.localState.isLoading = true;
    });

    this.localTimeout = setTimeout(() => {
      transformers.batch(() => {
        this.localState.localCounter += 1;
        this.localState.isLoading = false;
      });
    }, DELAY);
  };

  get sum() {
    const { store } = this.context;

    return (
      this.localState.localCounter + store.pages.first.modularCounter + store.counter.globalCounter
    );
  }

  render() {
    const { getLn, actions, store } = this.context;

    return (
      <div className={styles.wrapper}>
        {getLn(messages.innerText)}
        <Counter
          title={'Local counter'}
          value={this.localState.localCounter}
          isLoading={this.localState.isLoading}
          onIncrease={this.handleIncrease}
        />
        <Counter
          title={'Modular counter'}
          value={store.pages.first.modularCounter}
          isLoading={actions.pages.first.handleIncrease.state.isExecuting}
          onIncrease={actions.pages.first.handleIncrease}
        />
        <Counter
          title={'Global counter'}
          value={store.counter.globalCounter}
          isLoading={actions.counter.handleIncrease.state.isExecuting}
          onIncrease={actions.counter.handleIncrease}
        />
        <div className={styles.sum}>
          {getLn(messages.sum)} {this.sum}
        </div>
      </div>
    );
  }
}
