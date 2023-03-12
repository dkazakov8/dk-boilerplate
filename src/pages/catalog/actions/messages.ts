import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  getSaleTopProductsError: 'Error while trying to get sales products',
  getActiveOrdersError: 'Error while trying to get your active orders',
  getUpsellError: 'Error while trying to get upsell products',
});
