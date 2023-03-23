import { lazy, Suspense } from 'react';

import { env } from 'env';
import { Modal } from 'comp/modal';
import { Router } from 'compSystem/Router';
import { Confirm } from 'comp/confirm';
import { Notifications } from 'comp/notifications';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Layout } from 'comp/layout';

import styles from './App.scss';

// eslint-disable-next-line @typescript-eslint/naming-convention
const LazyActionsLogger = lazy(() => import('compSystem/ActionsLogger'));

export class App extends ConnectedComponent {
  render() {
    const { store } = this.context;

    return (
      <>
        <div className={styles.app}>
          <Layout>
            <Router wrapperClassName={styles.router} />
          </Layout>
        </div>
        <Modal />
        <Confirm />
        <Notifications />
        {store.ui.frontLoaded && env.LOGS_EXECUTING_ACTIONS && (
          <Suspense>
            <LazyActionsLogger />
          </Suspense>
        )}
      </>
    );
  }
}
