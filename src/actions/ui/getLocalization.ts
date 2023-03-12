import { TypeAction } from 'models';

type TypeParams = { language: 'en' };

export const getLocalization: TypeAction<TypeParams> = ({ store }, { language }) => {
  store.ui.currentLanguage = language;
  store.ui.lnData = {};

  return Promise.resolve();
};
