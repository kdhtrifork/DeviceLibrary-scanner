import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Device } from "../../shared/device/device";
import { DeviceService } from "../../shared/device/device.service";
import * as BarcodeScanner from "nativescript-barcodescanner";
import { Observable } from 'rxjs/Observable';


@Component({
    selector: "device-list",
    templateUrl: "./components/device-list/device-list.component.html"
})
export class DeviceListComponent implements OnInit {

    devices$: Observable<Device[]>;
    private errorMessage : string;

    public constructor(private router: Router, private deviceService: DeviceService) {
    }

    ngOnInit() {
      this.devices$ = this.deviceService.devices$; // subscribe to entire collection
    
      this.deviceService.loadAll();    // load all todos
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