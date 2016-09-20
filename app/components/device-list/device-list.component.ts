import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Device } from "../../shared/device/device";
import { DeviceService } from "../../shared/device/device.service";
import * as BarcodeScanner from "nativescript-barcodescanner";


@Component({
    selector: "device-list",
    templateUrl: "./components/device-list/device-list.component.html",
    providers: [DeviceService]
})
export class DeviceListComponent implements OnInit {

    devices: Device[] = [];
    private errorMessage : string;

    public constructor(private router: Router, private deviceService: DeviceService) {
    }

    ngOnInit() {
      this.deviceService.getAll()
        .subscribe(
        //   loadedGroceries => {
        // loadedGroceries.forEach((groceryObject) => {
        //   this.groceryList.unshift(groceryObject);
        // }
          loadedDevices => {
            loadedDevices.forEach((device) => {
              console.log('Handling: ' + device._id);
              this.devices.unshift(device);
            }
          )},
          error =>  this.errorMessage = <any>error
        );
    }

    public showDetails(id: string) {
        this.router.navigate(['/details', id]);
    }

    public scan() {
        BarcodeScanner.scan({
            cancelLabel: "Stop scanning",
            message: "Go scan something",
            preferFrontCamera: false,
            showFlipCameraButton: true
        }).then((result) => {
            console.log('Scanned: ', result.text);
            this.showDetails(result.text);
        });
    }

    public create() {
        this.router.navigate(["/create"]);
    }

}