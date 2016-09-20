import { Component, OnInit } from "@angular/core";
import * as BarcodeScanner from "nativescript-barcodescanner";
import './rxjs-operators';

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent implements OnInit {
    public constructor() {}

    public ngOnInit() {
        BarcodeScanner.available().then((available) => {
            if(available) {
                BarcodeScanner.hasCameraPermission().then((granted) => {
                    if(!granted) {
                        BarcodeScanner.requestCameraPermission();
                    }
                });
            }
        });
    }
}
