import { Modal } from 'comp/modal';
import { Router } from 'compSystem/Router';
import { Confirm } from 'comp/confirm';
import { Notifications } from 'comp/notifications';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Layout } from 'comp/layout';

import styles from './App.scss';

export class App extends ConnectedComponent {
  render() {
    return (
      <>
        <div className={styles.app}>
          <Layout>
            <Router />
          </Layout>
        </div>
        <Modal />
        <Confirm />
        <Notifications />
      </>
    );
  }
}
