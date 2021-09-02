import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppConfig {

    private config!: any;
    private env!: any;

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('env.json').pipe(
                map( (res: any) => res.json() ),
                catchError((error: any):any => {
                  console.log('Configuration file "env.json" could not be read');
                  resolve(true);
                  return Observable.throw(error.json().error || 'Server error');
                })
              ).subscribe( (envResponse: { env: string; }) => {
                this.env = envResponse;
                let request:any = null;

                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get('config.' + envResponse.env + '.json');
                    } break;

                    case 'development': {
                        request = this.http.get('config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request
                        .map( (res: { json: () => any; }) => res.json() )
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData: any) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
}
