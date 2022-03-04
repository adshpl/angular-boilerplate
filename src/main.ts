import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Environments } from 'constants/environments';
import { Process } from 'constants/process';
import { ApplicationModule } from 'application/application.module';

const { PRODUCTION } = Environments;
const { ENVIRONMENT } = Process;

(async () => {
  try {
    if (ENVIRONMENT === PRODUCTION) {
      enableProdMode();
    }

    await platformBrowserDynamic().bootstrapModule(ApplicationModule);
  } catch (error) {
    console.error(error);
  }
})();
