import styleguidist from 'react-styleguidist';

import { config } from './config';

styleguidist(config).build((err) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err);

  // eslint-disable-next-line no-console
  console.log('Styleguidist built');
});
