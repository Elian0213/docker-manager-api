import 'reflect-metadata';

import * as express from 'express';
import { container } from 'tsyringe';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { IController } from './types/controllers';
import ConfigService from './services/config-service';

// Controllers
import DockerController from './controllers/docker-controller';

// Entry point for the app.
const mainAsync = async () => {
  const app = express();

  const config = new ConfigService<Config>().loadConfigFromPath('./config.json');
  if (config == null) {
    throw new Error('config was not read properly. Please copy config.example.json and fill in the properties.');
  }

  container.register<Config>('Config', { useValue: config });

  // Formatting data & CORS
  app.use(bodyParser.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Attach controllers
  app.use('/docker', container.resolve<IController>(DockerController).getRouter());

  app.listen(config.ExpressPort, () => {
    // eslint-disable-next-line no-console
    console.log(`Back-end running! port: ${config.ExpressPort}`);
  });
};

mainAsync();
