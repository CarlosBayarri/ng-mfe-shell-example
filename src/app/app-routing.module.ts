import { loadRemoteEntry } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppConfig, createMicroFrontendRoute, MicroFrontend } from 'src/app.config';

const mainRutes: Routes = [ ];

@NgModule({
  imports: [RouterModule.forRoot(mainRutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor( private router: Router, private appConfig: AppConfig ){
    this.appConfig.getMFEList().subscribe((list: MicroFrontend[])=> {
      console.log('List', list);
      Promise.all([
        Object.keys(list).map((m: any) => loadRemoteEntry(list[m].remoteEntry, list[m].remoteName)),
      ]).catch((err) => console.error('Error loading remote entries', err))
        .then(() => {console.log('Loaded remote entry'); this.prepareRoutes(list)})
        .catch((err) => console.error(err));
    });
  }

  prepareRoutes( routesJson: any ) {
    const routes: Routes = [...Object.keys(routesJson).map((m) => createMicroFrontendRoute(routesJson[m]))];
    this.router.resetConfig( [...mainRutes, ...routes] );
  }
}
