/* tslint:disable:no-string-literal */
import {EnvironmentService} from './environment.service';

export const EnvServiceFactory = () => {
  const env = new EnvironmentService();

  // Read environment variables from browser window
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow['__env'] || {};
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = window['__env'][key];
    }
  }

  return env;
};

export const EnvironmentServiceProvider = {
  provide: EnvironmentService,
  useFactory: EnvServiceFactory,
  deps: [],
};
