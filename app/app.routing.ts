import { DeviceDetailComponent } from "./components/device-detail/device-detail.component";
import { CreateDeviceComponent } from "./components/create-device/create-device.component";
import { DeviceListComponent } from "./components/device-list/device-list.component";

export const routes = [
  { path: "", component: DeviceListComponent },
  { path: "details/:id", component: DeviceDetailComponent },
  { path: "create", component: CreateDeviceComponent }
];

export const navigatableComponents = [
  DeviceDetailComponent,
  CreateDeviceComponent,
  DeviceListComponent
];