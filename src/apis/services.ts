import { ConnectorService } from "./connector";
// import {ConfigService} from "./config";
import { GlobalsService } from "./globals";

import { Service } from "./baseService";

/**
 * Class that provides access to all of the services in the application.
 */
export class Services {
  public static getConnectorService(): ConnectorService {
    return Services.all.connector;
  }

  // public static getConfigService(): ConfigService {
  //     return Services.all.config;
  // }

  public static getGlobalsService(): GlobalsService {
    return Services.all.globals;
  }

  private static all: any = {
    // config: new ConfigService(),
    connector: new ConnectorService(),
    globals: new GlobalsService(),
  };

  // tslint:disable-next-line:member-ordering member-access
  static _intialize(): void {
    // First perform simple service-service injection.
    Object.keys(Services.all).forEach((svcToInjectIntoName) => {
      const svcToInjectInto: any = Services.all[svcToInjectIntoName];
      Object.keys(Services.all)
        .filter((key) => key !== svcToInjectIntoName)
        .forEach((injectableSvcKey) => {
          if (
            svcToInjectInto[injectableSvcKey] !== undefined &&
            svcToInjectInto[injectableSvcKey] === null
          ) {
            svcToInjectInto[injectableSvcKey] = Services.all[injectableSvcKey];
          }
        });
    });
    // Once that's done, init() all the services
    Object.keys(Services.all).forEach((svcToInjectIntoName) => {
      const svcToInit: Service = Services.all[svcToInjectIntoName];
      svcToInit.init();
    });
  }
}
Services._intialize();
