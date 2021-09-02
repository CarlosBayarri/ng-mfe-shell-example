import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { createMicroFrontendDynamicRoute, loadRemoteEntry } from 'ng-module-federation';
import { AppConfig } from 'src/app.config';
// import { microFrontends } from './app.component';

//const microFrontends = this.config.getList();
// import { AppConfig } from '../app.config';
// const routes: Routes = [...Object.keys(AppConfig).map((m) => createMicroFrontendDynamicRoute(microFrontends[m])),];
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor( private router: Router, private appConfig: AppConfig ){
    this.appConfig.load().then(()=> {
      console.log('Loaded');

      const microFrontends = this.appConfig.getList();

      Promise.all([
        Object.keys(microFrontends).map((m) => loadRemoteEntry(microFrontends[m].remoteEntry, microFrontends[m].remoteName)),
      ])
        .catch((err) => console.error('Error loading remote entries', err))
        .then(() => console.log('DONE'))
        .catch((err) => console.error(err));
        this.prepareRoutes(microFrontends);
    });

  }
  prepareRoutes( routesJson: any ) {
    console.log(routesJson);

      const routes: Routes = [...Object.keys(routesJson).map((m) => createMicroFrontendDynamicRoute(routesJson[m])),];
      this.router.resetConfig( routes );
  }
}
