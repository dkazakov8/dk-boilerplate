import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  cancel: 'Cancel',
  confirm: 'OK',
  raiseModalError: 'Error while trying to open modal',
});
