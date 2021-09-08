import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
export interface MicroFrontend {
  exposedModule?: string;
  moduleName?: string;
  remoteEntry: string;
  remoteName: string;
  routeData?: Data;
  routePath: string;
}
@Injectable()
export class AppConfig {

    private microFrontends!: any;

    constructor(private http: HttpClient) { }

    /**
     * Use to get the list of MFE
     */
    public getList() {
      return this.microFrontends;
    }

    public load() {
      return this.http.get('https://api.npoint.io/060c5c41dcc407a098d8').toPromise().then( (response: any) => {
          for (const key in response) {
            if (Object.prototype.hasOwnProperty.call(response, key)) {
              const element: MicroFrontend = response[key];
              response[key] = element;
            }
          }
          this.microFrontends = response;
          console.log('data')
          return true;
      });
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
