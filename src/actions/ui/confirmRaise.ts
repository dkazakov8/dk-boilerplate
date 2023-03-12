import { TypeAction, TypeConfirm } from 'models';

type TypeParams = Omit<TypeConfirm, 'isLeaving' | 'isEntering'>;

export const confirmRaise: TypeAction<TypeParams> = ({ store }, confirm) => {
  store.ui.confirm = Object.assign({}, confirm, {
    isLeaving: false,
    isEntering: true,
  });

  return Promise.resolve();
};
