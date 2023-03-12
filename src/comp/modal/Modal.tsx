import cn from 'classnames';
import { createRef, MouseEventHandler, ReactNode } from 'react';
import { observable, runInAction } from 'mobx';

import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { system, testId } from 'const';
import { BodyClass } from 'comp/bodyClass';
import { appendAutorun } from 'utils';

import styles from './Modal.scss';
import { messages } from './messages';

const shakingDuration = `${system.MODALS_SHAKING_TIMEOUT}ms`;
const transitionDuration = `${system.MODALS_LEAVING_TIMEOUT}ms`;

export class Modal extends ConnectedComponent {
  localState = observable({ isLoaded: false });

  modalRef = createRef<HTMLDivElement>();

  component: ReactNode = null;

  UNSAFE_componentWillMount() {
    appendAutorun(this, this.beforeOpen);
  }

  beforeOpen = () => {
    const { store, actions, getLn } = this.context;
    const { modal } = store.ui;

    if (modal?.component) {
      runInAction(() => (this.localState.isLoaded = false));

      this.setBodyPadding();

      if (modal.beforeLoad) {
        void modal
          .beforeLoad()
          .then(this.afterLoad)
          .catch((error) => {
            console.error(error);

            void actions.ui.notificationRaise({
              type: 'error',
              message: getLn(messages.raiseModalError),
              delay: 3000,
            });

            void actions.ui.modalRemove();
          });
      } else {
        void this.afterLoad().catch((error) => {
          console.error(error);

          void actions.ui.notificationRaise({
            type: 'error',
            message: getLn(messages.raiseModalError),
            delay: 3000,
          });

          void actions.ui.modalRemove();
        });
      }
    } else this.removeBodyPadding();
  };

  afterLoad = () => {
    const { store, actions } = this.context;
    const { modal } = store.ui;

    if (!modal?.component) return Promise.resolve();

    return import(`./lib/${modal.component}`).then((comp) => {
      this.component = comp[modal.component];

      runInAction(() => (this.localState.isLoaded = true));

      if (modal.shakeOnInit && !store.ui.isMobile) void actions.ui.modalShake();
    });
  };

  setBodyPadding = () => {
    if (!IS_CLIENT) return;

    const bodyScrollbarWidth = window.innerWidth - document.body.offsetWidth;

    document.body.style.paddingRight = `${bodyScrollbarWidth}px`;
  };

  removeBodyPadding = () => {
    if (!IS_CLIENT) return;

    document.body.style.paddingRight = ``;

    this.component = null;
  };

  handleClose = () => {
    const { actions } = this.context;

    void actions.ui.modalRemove();
  };

  handleClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    const { store } = this.context;

    if (
      !store.ui.modal ||
      store.ui.modal.isLeaving ||
      !store.ui.modal.closeByBackdrop ||
      this.modalRef.current !== event.target
    )
      return;

    this.handleClose();
  };

  render() {
    const { store } = this.context;
    const { isLoaded } = this.localState;

    const modal = store.ui.modal;

    if (!modal) return null;

    const { isLeaving, isShaking, componentProps } = modal;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Component = this.component;
    const zIndex = system.MODALS_BASE_Z_INDEX;

    return (
      <div
        className={cn(styles.backdrop, isLeaving && styles.isLeaving)}
        style={{ zIndex, transitionDuration, animationDuration: transitionDuration }}
        id={testId.modal}
      >
        <BodyClass isActive className={styles.bodyOverflowHidden} />
        <div
          ref={this.modalRef}
          onClick={this.handleClickOutside}
          style={{ zIndex: zIndex + 1, animationDuration: shakingDuration }}
          className={cn(
            styles.modalWrapper,
            isShaking && styles.isShaking,
            modal.contentFullHeight && styles.contentFullHeight
          )}
          id={modal.component}
        >
          {!isLoaded && <div className={styles.spinner} />}
          {/* @ts-ignore eslint-disable-next-line react/jsx-handler-names */}
          {isLoaded && Component && <Component {...((componentProps as any) || {})} />}
        </div>
      </div>
    );
  }
}
