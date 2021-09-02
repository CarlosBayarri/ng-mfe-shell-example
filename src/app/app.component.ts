import { Component } from '@angular/core';
import { MicroFrontend, MicroFrontendConfig } from 'ng-module-federation';
import { loadRemoteEntry } from 'ng-module-federation';

export const microFrontends: MicroFrontendConfig = {
  mfe1: new MicroFrontend('https://carlosbayarri.github.io/ng-mfe-example/remoteEntry.js', 'mfe1', 'mfe1', 'Mfe1Module')
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

  constructor() {
    console.log('app constructor')
    Promise.all([
      Object.keys(microFrontends).map((m) => loadRemoteEntry(microFrontends[m].remoteEntry, microFrontends[m].remoteName)),
    ])
      .catch((err) => console.error('Error loading remote entries', err))
      .then(() => console.log('DONE'))
      .catch((err) => console.error(err));
  }
}
