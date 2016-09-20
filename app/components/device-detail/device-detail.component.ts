import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Device } from "../../shared/device/device";
import { DeviceService } from "../../shared/device/device.service";


@Component({
    selector: "details",
    templateUrl: "./components/device-detail/device-detail.component.html",
    providers: [DeviceService]
})
export class DeviceDetailComponent implements OnInit {

    public device: Device;

    public constructor(private route: ActivatedRoute, private router: Router, private deviceService: DeviceService) {
    }

    public ngOnInit() {
      this.route.params.forEach((params: Params) => {
        let id = params['id'];
        this.device = this.deviceService.getDevice(id);
        // When changing to promise
        //this.deviceService.getDevice(id).then(device => this.device = device);
      });
    }

}