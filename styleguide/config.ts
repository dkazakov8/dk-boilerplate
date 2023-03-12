import path from 'path';

import { StyleguidistConfig } from 'react-styleguidist/lib/typings';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

import { env } from '../env';
import { paths } from '../paths';
import webpackConfig from '../_webpack/client.config';

/**
 * @docs: https://react-styleguidist.js.org/docs/configuration
 *
 */

export const config: StyleguidistConfig = {
  webpackConfig: Object.assign({}, webpackConfig, {
    plugins: [
      webpackConfig.plugins?.find((plugin) => plugin instanceof webpack.DefinePlugin),
      webpackConfig.plugins?.find((plugin) => plugin instanceof MiniCssExtractPlugin),
      ...(webpackConfig.plugins?.filter((plugin) => plugin instanceof CompressionPlugin) || []),
    ],
    watch: true,
    optimization: { minimize: false },
    devServer: {
      watchFiles: [paths.source],
    },
  }),
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Wrapper: path.resolve(paths.source, 'compSystem/styleguideWrapper'),
  },
  theme: {
    fontFamily: {
      base: ['"Stratos"'],
    },
  },
  template: {
    favicon: false,
    head: {
      raw: `<script>window.SERVER_CONFIG = ${JSON.stringify({
        API_HOST: env.API_HOST,
      })};</script>`,
    },
  },
  tocMode: 'collapse',
  usageMode: 'collapse',
  exampleMode: 'collapse',
  showSidebar: true,
  styleguideDir: paths.sg,
  serverPort: env.SG_PORT,
  minimize: false,
  pagePerSection: true,
  contextDependencies: [paths.source],
  sections: [
    {
      name: 'Components',
      components: path.resolve(paths.source, 'comp/**/[A-Z]*.tsx'),
      // Will show "Components" as single page, filtering its children
      sectionDepth: 1,
    },
  ],
};
