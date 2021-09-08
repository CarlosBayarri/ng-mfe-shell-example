import { loadRemoteEntry, loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { AppConfig, MicroFrontend } from 'src/app.config';

export const createMicroFrontendRoute = (mfe: MicroFrontend): Route => ({
  data: mfe.routeData ?? {},
  path: mfe.routePath,
  loadChildren: () => loadRemoteModule({
    remoteEntry: mfe.remoteEntry,
    remoteName: mfe.remoteName,
    exposedModule: mfe.exposedModule ?? './Module',
  }).then((m) => m[mfe.moduleName ?? 'MfeModule']).catch((err)=> console.error(err))
});
const mainRutes: Routes = [ ];

@NgModule({
  imports: [RouterModule.forRoot(mainRutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor( private router: Router, private appConfig: AppConfig ){
    this.appConfig.load().then(()=> {
      const microFrontends = this.appConfig.getList();
      Promise.all([
        Object.keys(microFrontends).map((m) => loadRemoteEntry(microFrontends[m].remoteEntry, microFrontends[m].remoteName)),
      ])
        .catch((err) => console.error('Error loading remote entries', err))
        .then(() => console.log('done'))
        .catch((err) => console.error(err));
        ;
        this.prepareRoutes(microFrontends)
    });

  }
  prepareRoutes( routesJson: any ) {
    console.log('preparing')
      const routes: Routes = [...Object.keys(routesJson).map((m) => createMicroFrontendRoute(routesJson[m]))];
      console.log(routes);
      this.router.resetConfig( routes );
  }
}
