import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Device } from "./device";
import { Config } from '../config/config';

@Injectable()
export class DeviceService {

	private _devices$: Subject<Device[]>;
  private baseUrl: string;
  private dataStore: {
    devices: Device[]
  };

  constructor(private http: Http) {
    this.baseUrl = Config.serverBaseUrl + 'devices';
    this.dataStore = { devices: [] };
    this._devices$ = <Subject<Device[]>>new Subject();
  }

  get devices$() {
    return this._devices$.asObservable();
  }

  loadAll() {
    this.http.get(this.baseUrl).map(response => response.json()).subscribe(data => {
      this.dataStore.devices = data;
      this._devices$.next(this.dataStore.devices);
    }, error => console.log('Could not load devices.'));
  }

  load(id: string) {
    this.http.get(`${this.baseUrl}/${id}`).map(response => response.json()).subscribe(data => {
    	let foundDevice;
    	if ( data instanceof Array && data.length === 1 ) {
    		foundDevice = data[0];
    	} else {
    		foundDevice = data;
    	}

    	if ( !foundDevice ) {
    		return;
    	}

      let notFound = true;
      this.dataStore.devices.forEach((item, index) => {
        if (item._id === foundDevice._id) {
          this.dataStore.devices[index] = foundDevice;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.devices.push(foundDevice);
      }
      console.log('Before next in single load');
      this._devices$.next(this.dataStore.devices);
      console.log('After next in single load');
    }, error => console.log('Could not load device.'));
  }

  create(device: Device) {
    this.http.post(`${this.baseUrl}`, JSON.stringify(device))
      .map(response => response.json()).subscribe(data => {
        this.dataStore.devices.push(data);
        this._devices$.next(this.dataStore.devices);
      }, error => console.log('Could not create device.'));
  }

  update(device: Device) {
    this.http.put(`${this.baseUrl}/${device._id}`, JSON.stringify(device))
      .map(response => response.json()).subscribe(data => {
        this.dataStore.devices.forEach((device, i) => {
          if (device._id === data._id) { this.dataStore.devices[i] = data; }
        });

        this._devices$.next(this.dataStore.devices);
      }, error => console.log('Could not update device.'));
  }

  remove(deviceId: string) {
    this.http.delete(`${this.baseUrl}/${deviceId}`).subscribe(response => {
      this.dataStore.devices.forEach((t, i) => {
        if (t._id === deviceId) { this.dataStore.devices.splice(i, 1); }
      });

      this._devices$.next(this.dataStore.devices);
    }, error => console.log('Could not delete device.'));
  }

}