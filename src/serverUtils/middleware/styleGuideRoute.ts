import fs from 'fs';
import path from 'path';

import { Application } from 'express';

import { serverRoutes } from 'const';
import { env } from 'env';
import { paths } from 'paths';

export function styleGuideRoute(app: Application) {
  if (env.SG_BUILD_ENABLED) {
    app.get(serverRoutes.sg, (req, res) => {
      res.send(fs.readFileSync(path.resolve(paths.sg, 'index.html'), 'utf-8'));
    });
  }
}
