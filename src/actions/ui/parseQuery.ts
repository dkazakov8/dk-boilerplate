import { TypeAction } from 'models';

export const parseQuery: TypeAction = () => {
  if (!IS_CLIENT) return Promise.resolve();

  const urlSearchParams = new URLSearchParams(window.location.search);

  const isWebview = urlSearchParams.get('webview') === 'true';

  if (isWebview) document.body.classList.add('webview');

  return Promise.resolve();
};
