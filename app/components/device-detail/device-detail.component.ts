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

        console.log(this.deviceService.devices$);
        this.device$ = this.deviceService.devices$.map(devices => {
          console.log('Map in detail');
          return devices[0];
        });
        this.device$ = this.deviceService.devices$
          .map(this.deviceByIdFilter(id));
        this.deviceService.load(id);
      });
    }

    private deviceByIdFilter(id) {
      return (devices) => {
        let result = devices.filter(device => device._id === id);
        return result.length === 1 ? result[0] : undefined;
      };
    }

}