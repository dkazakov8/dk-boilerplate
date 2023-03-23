/* eslint-disable react/jsx-handler-names */

import { observable, runInAction } from 'mobx';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Counter } from 'comp/counter';

import { messages } from './messages';
import styles from './Second.scss';

const DELAY = 1000;

export class Second extends ConnectedComponent {
  localTimeout?: ReturnType<typeof setTimeout> = undefined;

  localState = observable({
    localCounter: 0,
    isLoading: false,
  });

  UNSAFE_componentWillMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.title, description: messages.description });
  }

  componentWillUnmount() {
    clearTimeout(this.localTimeout!);
  }

  handleIncrease = () => {
    runInAction(() => {
      this.localState.isLoading = true;
    });

    this.localTimeout = setTimeout(() => {
      runInAction(() => {
        this.localState.localCounter += 1;
        this.localState.isLoading = false;
      });
    }, DELAY);
  };

  get sum() {
    const { store } = this.context;

    return (
      this.localState.localCounter + store.pages.second.modularCounter + store.counter.globalCounter
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
          value={store.pages.second.modularCounter}
          isLoading={actions.pages.second.handleIncrease.state.isExecuting}
          onIncrease={actions.pages.second.handleIncrease}
        />
        <Counter
          title={'Global counter'}
          value={store.counter.globalCounter}
          isLoading={actions.counter.handleIncrease.state.isExecuting}
          onIncrease={actions.counter.handleIncrease}
        />
        <div className={styles.sum}>Sum of all available counters: {this.sum}</div>
      </div>
    );
  }
}
