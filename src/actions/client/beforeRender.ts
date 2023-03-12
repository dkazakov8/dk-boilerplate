import { TypeAction } from 'models';

export const beforeRender: TypeAction = ({ actions }) => {
  return Promise.resolve()
    .then(() =>
      Promise.all([
        actions.ui.setUserAgent({}),
        actions.ui.setScreenSize(),
        actions.general.checkAppVersion(),
      ])
    )
    .then(() => undefined);
};
