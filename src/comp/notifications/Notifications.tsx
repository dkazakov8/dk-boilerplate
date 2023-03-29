import cn from 'classnames';
import { createRef } from 'react';

import { transformers } from 'compSystem/transformers';
import { ConnectedComponent } from 'compSystem/ConnectedComponent';
import { appendAutorun, generateArray } from 'utils';
import { TypeNotification } from 'models';
import { Icon } from 'comp/icon';
import { system } from 'const';

import styles from './Notifications.scss';

type PropsNotification = Omit<TypeNotification, 'delay'> & {
  prevElementsHeight: number;
};

/**
 * How notifications work:
 *
 * 1. Some code calls store.raiseNotification so new notification object
 * is added to store.ui.notifications
 *
 * 2. Dom element is mounted with zero opacity and after first render it's
 * real height is added to notification object
 *
 * 3. Dom element becomes visible with top offset calculated by sum of
 * previous notifications' heights
 *
 * 4. When it's time to remove notification, it's status at first becomes
 * 'leaving', so dom element becomes fading; after transition end notification object
 * is removed from store.ui.notifications
 *
 * 5. Top offset for other notifications is recalculated, and they smoothly
 * fly to their new position (optimized by using 'translateY' instead of 'top'
 * transition)
 *
 */

class Notification extends ConnectedComponent<PropsNotification> {
  ref = createRef<HTMLDivElement>();

  componentDidMount() {
    appendAutorun(this, this.trackHeight);
  }

  trackHeight = () => {
    const { store } = this.context;
    const { id } = this.props;
    const { notifications } = store.ui;

    const notificationObservable = notifications.find((n) => id === n.id)!;

    if (store.ui.screen.width == null || !notificationObservable) return;

    transformers.batch(() => {
      notificationObservable.height = this.ref.current!.offsetHeight;
    });
  };

  handleCloseClick = () => {
    const { id } = this.props;
    const { actions } = this.context;

    void actions.ui.notificationRemove({ id });
  };

  render() {
    const { status, type, height, message, prevElementsHeight } = this.props;

    const className = cn({
      [styles.notification]: true,
      [styles[type]]: true,
      [styles.visible]: Boolean(height),
      [styles.leaving]: status === 'leaving',
    });

    const style = { transform: `translateY(${prevElementsHeight}px)` };

    return (
      <div className={className} style={style} ref={this.ref}>
        <div className={styles.notificationInner}>
          <Icon
            glyph={type === 'error' ? 'alertCircleFill' : 'successCircle'}
            className={styles.icon}
          />
          <div className={styles.message}>{message}</div>
          <Icon glyph={'closeCircle'} className={styles.close} onClick={this.handleCloseClick} />
        </div>
      </div>
    );
  }
}

export class Notifications extends ConnectedComponent {
  render() {
    const { store } = this.context;

    const wrapperStyle = {
      zIndex: system.NOTIFICATIONS_BASE_Z_INDEX,
    };

    return (
      <div className={styles.notifications} style={wrapperStyle}>
        {store.ui.notifications.map((notification, index) => {
          const prevElementsHeight = generateArray(index).reduce(
            (num, i) => num + (store.ui.notifications[i].height || 0),
            0
          );

          /**
           * Don't pass the whole notification observable, because it will
           * lead to lots of rerenders (Notification component will start
           * listening to changes, but it should not)
           *
           */

          return (
            <Notification
              id={notification.id}
              key={notification.id}
              type={notification.type}
              height={notification.height}
              status={notification.status}
              message={notification.message}
              prevElementsHeight={prevElementsHeight}
            />
          );
        })}
      </div>
    );
  }
}
