import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { ModalTopLine } from 'comp/modalTopLine';

import styles from './ModalLib.scss';
import { messages } from './messages';

type PropsExample = {
  text: string;
};

export class Example extends ConnectedComponent<PropsExample> {
  render() {
    const { text } = this.props;
    const { store, getLn } = this.context;

    const { onBack } = store.ui.modal!;

    return (
      <div className={styles.modalContent}>
        <ModalTopLine onBack={onBack} title={getLn(messages.example_title)} />
        <div className={styles.contentLine}>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    );
  }
}
