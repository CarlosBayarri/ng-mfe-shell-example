//import { loadRemoteEntry } from 'ng-module-federation';

// import { microFrontends } from './micro-frontends';

// Promise.all([
//   Object.keys(microFrontends).map((m) => loadRemoteEntry(microFrontends[m].remoteEntry, microFrontends[m].remoteName)),
// ])
//   .catch((err) => console.error('Error loading remote entries', err))
//   .then(() => import('./bootstrap'))
//   .catch((err) => console.error(err));

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
