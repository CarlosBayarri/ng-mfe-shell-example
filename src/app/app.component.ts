import { Component } from '@angular/core';
import { MicroFrontend, MicroFrontendConfig } from 'ng-module-federation';
import { loadRemoteEntry } from 'ng-module-federation';
import { AppConfig } from 'src/app.config';

// export const microFrontends: MicroFrontendConfig = {
//   mfe1: new MicroFrontend('https://carlosbayarri.github.io/ng-mfe-example/remoteEntry.js', 'mfe1', 'mfe1', 'Mfe1Module')
// };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'shell';

  public microFrontends!: any;

  constructor() {
    console.log('app constructor')
  }
}
