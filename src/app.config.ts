import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MicroFrontend } from 'ng-module-federation';

@Injectable()
export class AppConfig {

    private microFrontends!: any;

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the list of MFE
     */
    public getList() {
      return this.microFrontends;
    }

    public load() {
      return this.http.get('https://json.extendsclass.com/bin/ccf23d366fa8').toPromise().then( (response: any) => {
          for (const key in response) {
            if (Object.prototype.hasOwnProperty.call(response, key)) {
              const element = response[key];
              const element2 = new MicroFrontend(element.remoteEntry, element.remoteName, element.route, element.ngModuleName)
              response[key] = element2;
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
