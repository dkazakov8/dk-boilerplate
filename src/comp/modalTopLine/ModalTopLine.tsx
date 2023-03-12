import cn from 'classnames';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { Button, PropsButton } from 'comp/button';
import { testId } from 'const';

import styles from './ModalTopLine.scss';

type PropsModalTopLine = {
  title?: string;
  onBack?: () => void;
  noClose?: boolean;
  detached?: boolean;
  buttonsType?: PropsButton<any>['type'];
};

export class ModalTopLine extends ConnectedComponent<PropsModalTopLine> {
  handleClose = () => {
    const { actions } = this.context;

    void actions.ui.modalRemove();
  };

  render() {
    const { store } = this.context;
    const { title, onBack, detached, buttonsType, noClose } = this.props;

    const isMobile = store.ui.isMobile;

    return (
      <div className={cn(styles.topLine, detached && styles.detached)}>
        <div className={styles.backWrapper} onClick={isMobile ? onBack : undefined}>
          {onBack != null && (
            <Button
              type={buttonsType || 'grey'}
              size={'small'}
              iconOnly={'arrowLeft'}
              onClick={isMobile ? undefined : onBack}
              id={testId.buttonBackInsideModal}
            />
          )}
        </div>
        <div className={styles.title}>{title != null && title}</div>
        {!noClose && (
          <div className={styles.closeWrapper} onClick={isMobile ? this.handleClose : undefined}>
            <Button
              type={buttonsType || 'grey'}
              size={'small'}
              onClick={isMobile ? undefined : this.handleClose}
              iconOnly={'closeSmall'}
              id={testId.buttonCloseInsideModal}
            />
          </div>
        )}
      </div>
    );
  }
}
