import UAParser from 'ua-parser-js';

import { TypeAction } from 'models';

type TypeParams = { userAgent?: string };

export const setUserAgent: TypeAction<TypeParams> = ({ store }, { userAgent }) => {
  try {
    store.ui.parsedUA = new UAParser(userAgent).getResult();

    if (store.ui.parsedUA?.os.name === 'iOS') {
      document.body.classList.add('iphone');
    }

    if (store.ui.parsedUA?.os.name === 'Android') {
      document.body.classList.add('android');
    }
  } catch (error) {
    console.error(`setUserAgent`, error);
  }

  return Promise.resolve();
};
