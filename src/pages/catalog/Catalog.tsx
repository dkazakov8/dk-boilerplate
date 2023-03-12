import { ConnectedComponent } from 'compSystem/ConnectedComponent';

import { messages } from './messages';
import styles from './Catalog.scss';

export class Catalog extends ConnectedComponent {
  UNSAFE_componentWillMount() {
    const { actions } = this.context;

    void actions.routing.setMetaData({ title: messages.title, description: messages.description });
  }

  render() {
    return <div className={styles.wrapper}>Main page</div>;
  }
}
