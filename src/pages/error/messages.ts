import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  metaTitle: 'Error',
  error404Title: 'Oops, page not found',
  error500Title: 'Something goes wrong',
  error500Subtitle: 'Please try again later',
});
