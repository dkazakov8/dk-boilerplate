import { generateId } from 'utils';
import { TypeAction, TypeNotification } from 'models';

type TypeParams = Pick<TypeNotification, 'type' | 'message' | 'delay'>;

export const notificationRaise: TypeAction<TypeParams> = (
  { store, actions },
  { type, message, delay = 0 }
) => {
  const { notifications } = store.ui;

  // Server has already rendered this notification or it is a duplication
  const existingNotification = notifications.find(
    (n) => n.message === message && n.type === type && n.delay === delay
  );

  if (existingNotification) {
    if (existingNotification.delay !== 0 && IS_CLIENT) {
      setTimeout(
        () => actions.ui.notificationRemove({ id: existingNotification.id }),
        existingNotification.delay
      );
    }

    return Promise.resolve();
  }

  // Create a new notification
  const alreadyUsedIds = notifications.map(({ id }) => id!);
  const id = generateId({ excludedIds: alreadyUsedIds });

  const notification: TypeNotification = {
    id,
    type,
    delay,
    message,
    status: 'entering',
  };

  notifications.push(notification);

  if (delay !== 0 && IS_CLIENT) {
    setTimeout(() => actions.ui.notificationRemove({ id }), delay);
  }

  return Promise.resolve();
};
