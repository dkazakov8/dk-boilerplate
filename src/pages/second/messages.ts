import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  title: 'Second page title',
  description: 'Second page description',
  innerText: 'Second page',
  sum: 'Sum of all available counters:',
});
