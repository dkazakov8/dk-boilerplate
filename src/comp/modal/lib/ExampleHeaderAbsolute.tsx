import cn from 'classnames';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { ModalTopLine } from 'comp/modalTopLine';

import styles from './ModalLib.scss';

type PropsExampleHeaderAbsolute = {
  text: string;
};

export class ExampleHeaderAbsolute extends ConnectedComponent<PropsExampleHeaderAbsolute> {
  render() {
    const { text } = this.props;
    const { store } = this.context;

    const { onBack } = store.ui.modal!;

    return (
      <div className={styles.modalContent}>
        <ModalTopLine onBack={onBack} detached buttonsType={'white'} />
        <div className={cn(styles.contentLine, styles.yellow)}>
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    );
  }
}
