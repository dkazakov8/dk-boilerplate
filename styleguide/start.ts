import styleguidist from 'react-styleguidist';
import { generateFiles } from 'dk-file-generator';

import { generatorConfigs } from '../_webpack/generator.config';
import { env } from '../env';
import { paths } from '../paths';

import { config } from './config';

void Promise.resolve()
  .then(() =>
    generateFiles({
      configs: generatorConfigs,
      timeLogs: env.LOGS_GENERATION_DETAILS,
      timeLogsOverall: true,
      fileModificationLogs: true,
      watch: {
        paths: [paths.source],
        changedFilesLogs: true,
        aggregationTimeout: env.GENERATOR_AGGREGATION_TIMEOUT,
      },
    })
  )
  .then(() =>
    styleguidist(config).server((err) => {
      // eslint-disable-next-line no-console
      if (err) console.log(err);

      // eslint-disable-next-line no-console
      console.log('Styleguidist built');
    })
  );
