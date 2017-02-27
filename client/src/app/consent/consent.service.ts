import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {SensitivityPolicy} from "./sensitivity-policy";
import 'rxjs/add/operator/toPromise';
import {PurposeOfUse} from "./purpose-of-use";
import {Provider} from "./Provider";

@Injectable()
export class ConsentService {
  //TODO get configuration url from backend on application startup
  private pcmBaseUrl:string = "http://localhost/pcm/patients/";
  private pcmProvidersUrl:string = this.pcmBaseUrl + "/providers";
  private pcmPurposeOfUseUrl:string = this.pcmBaseUrl + "purposeOfUse";
  private pcmSensitivityPolicyUrl:string = this.pcmBaseUrl + "sensitivityPolicy";

  constructor(private http: Http) { }

  getProviders(): Promise<Provider[]> {

    return this.http.get(this.pcmProvidersUrl)
                      .toPromise()
                      .then(response => response.json() as Provider[])
                      .catch(this.handleError);
  }

  getPurposeOfUses():Promise<PurposeOfUse[]>{
    return this.http.get(this.pcmPurposeOfUseUrl)
                .toPromise()
                .then(response => response.json() as PurposeOfUse[])
                .catch(this.handleError);
  }

  getSensitivityPolices():Promise<SensitivityPolicy[]>{
    return this.http.get(this.pcmSensitivityPolicyUrl)
                        .toPromise()
                        .then(response => response.json() as SensitivityPolicy[])
                        .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('Error in getting data from the backend', error);
    return Promise.reject(error.message || error);
  }

}
