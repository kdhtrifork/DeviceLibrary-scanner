import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable }     from 'rxjs/Observable';

import { Device } from "./device";
import { Config } from '../config/config';

@Injectable()
export class DeviceService {

	private devicesUrl;
	private loadedFromServer : boolean = false;

	constructor(private http: Http) {
		this.devicesUrl = Config.serverBaseUrl + 'devices';
	}

  create(device: Device) {
    
  }

  getDevice(id: string) : Observable<Device> {
    return this.http.get(this.devicesUrl + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAll() : Observable<Device[]> {
  	console.log('Fetching from ', this.devicesUrl);
    return this.http.get(this.devicesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
  	console.log('Returning from server', body);
    return body || [];
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}