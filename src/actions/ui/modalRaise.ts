import { TypeAction, TypeModal } from 'models';

type TypeParams = Omit<TypeModal, 'isLeaving' | 'isShaking'>;

export const modalRaise: TypeAction<TypeParams> = ({ store }, modal) => {
  store.ui.modal = Object.assign({}, modal, {
    isLeaving: false,
    isShaking: false,
  });

  return Promise.resolve();
};
