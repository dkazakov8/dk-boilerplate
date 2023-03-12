import { Application } from 'express';

import { serverRoutes } from 'const';

export function healthcheck(app: Application) {
  app.get(serverRoutes.healthcheck, (req, res) => {
    res.send('ok');
  });
}
