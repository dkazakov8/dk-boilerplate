import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  notificationUpdateApp: 'App was updated, please refresh page',
  notificationUpdateAppConfirm: 'Reload',
});
