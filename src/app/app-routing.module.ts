import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createMicroFrontendDynamicRoute } from 'ng-module-federation';
import { microFrontends } from './app.component';

const routes: Routes = [...Object.keys(microFrontends).map((m) => createMicroFrontendDynamicRoute(microFrontends[m])),];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
