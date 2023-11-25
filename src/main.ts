import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

CapacitorUpdater.notifyAppReady();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
