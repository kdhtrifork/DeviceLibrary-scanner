import {Component} from "@angular/core";
import {Location} from "@angular/common";
import { Device } from "../../shared/device/device";
import { DeviceService } from "../../shared/device/device.service";

@Component({
    selector: "create",
    templateUrl: "./components/create-device/create-device.component.html",
    providers: [DeviceService]
})
export class CreateDeviceComponent {

    public device: Device;

    public constructor(private location: Location, private deviceService: DeviceService) {
        this.device = {
            _id: '',
            name: '',
            os: '',
            osversion: '',
            os_version_number: 0,
            model : '',
            upgradeAllowed: false,
            borrowStatus: ''
        }
    }

    public save() {
        if( this.device._id && this.device.name ) {
            this.deviceService.create(this.device);
            this.location.back();
        }
    }

}