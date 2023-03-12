import { TypeAction } from 'models';
import { routes } from 'routes';

export const beforeRender: TypeAction = ({ store, actions, req, res }) => {
  if (!req || !res) return Promise.resolve();

  if (req.originalUrl === routes.error500.path) return Promise.resolve();

  return Promise.resolve()
    .then(() =>
      Promise.all([
        actions.ui.setTheme({ theme: store.ui.themesList[0] }),
        actions.ui.getLocalization({ language: 'en' }),
      ])
    )
    .then(() => undefined);
};
