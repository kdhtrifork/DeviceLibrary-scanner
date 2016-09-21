import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Device } from "../../shared/device/device";
import { DeviceService } from "../../shared/device/device.service";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "details",
    templateUrl: "./components/device-detail/device-detail.component.html"
})
export class DeviceDetailComponent implements OnInit {

    device$: Observable<Device>;

    public constructor(private route: ActivatedRoute, private router: Router, private deviceService: DeviceService) {
    }

    public ngOnInit() {
      this.route.params.forEach((params: Params) => {
        let id = params['id'];
        console.log('Details for ' + id);

        this.device$ = this.deviceService.devices$
          .map(devices => {
            console.log('Before loop: ' + devices.length);
            let foundDevice: Device;
            devices.forEach(device => {
              if ( device._id === id ) {
                foundDevice = device;
              }
            });
            return foundDevice;
          });

        this.deviceService.load(id);
      });
    }

}