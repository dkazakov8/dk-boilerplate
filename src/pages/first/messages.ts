import { wrapMessages } from 'dk-localize';

export const messages = wrapMessages(__dirname, {
  title: 'First page title',
  description: 'First page description',
  innerText: 'First page',
  sum: 'Sum of all available counters:',
});
