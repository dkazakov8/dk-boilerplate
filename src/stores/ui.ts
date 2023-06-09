import { TypeTranslations } from 'dk-localize';
import { TypeThemes } from 'dk-file-generator/dist/src/plugins/theme/types';

import { transformers } from 'compSystem/transformers';
import { themes } from 'const';
import { getTypedKeys } from 'utils';
import { TypeConfirm, TypeMetaData, TypeModal, TypeNotification } from 'models';

const languagesList = ['en'] as const;

// eslint-disable-next-line import/no-default-export
export default class StoreUi {
  lnData: TypeTranslations = {};
  currentLanguage = languagesList[0];
  currentTheme: keyof typeof themes | '' = '';
  themeParams: TypeThemes[keyof typeof themes] = {};
  themesList = getTypedKeys(themes);
  metaData: TypeMetaData = {};
  frontLoaded = false;
  screen = { width: 0, height: 0, scrollTop: 0 };
  modal?: TypeModal = undefined;
  confirm?: TypeConfirm = undefined;
  notifications: Array<TypeNotification> = [];

  constructor() {
    transformers.classToObservable(this);
  }

  get isMobile() {
    return IS_CLIENT && this.screen.width > 0 && document.body.classList.contains('mobile');
  }
}
