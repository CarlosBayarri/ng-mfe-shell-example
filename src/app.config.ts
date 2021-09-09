import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface MicroFrontend {
  exposedModule?: string;
  moduleName?: string;
  remoteEntry: string;
  remoteName: string;
  routeData?: Data;
  routePath: string;
}

export const createMicroFrontendRoute = (mfe: MicroFrontend): Route => ({
  data: mfe.routeData ?? {},
  path: mfe.routePath,
  loadChildren: () => loadRemoteModule({
    remoteEntry: mfe.remoteEntry,
    remoteName: mfe.remoteName,
    exposedModule: mfe.exposedModule ?? './Module',
  }).then((m) => m[mfe.moduleName ?? 'MfeModule']).catch((err)=> console.error(err))
});

@Injectable()
export class AppConfig {

    private endpointMFE: string = 'https://api.npoint.io/2497500d37e3a26487d1';

    constructor(private http: HttpClient) { }

    public getMFEList(): Observable<MicroFrontend[]> {
      return this.http.get(this.endpointMFE).pipe(
        map((response: any) => {
          for (const key in response) {
            if (Object.prototype.hasOwnProperty.call(response, key)) {
              const element: MicroFrontend = response[key];
              response[key] = element;
              console.log('Element', element);
            }
          }
          return response;
        })
      );
    }
}

/*
{
  "mfe1":
  {
    "remoteEntry": "https://carlosbayarri.github.io/ng-mfe-example/remoteEntry.js",
    "remoteName": "mfe1",
    "route": "mfe1",
    "ngModuleName": "Mfe1Module"
  }
}
*/
