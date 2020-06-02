import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocationPageRoutingModule } from './geolocation-routing.module';

import { GeolocationPage } from './geolocation.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geofence } from '@ionic-native/geofence/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocationPageRoutingModule
  ],
  providers:[Geolocation, Geofence],
  declarations: [GeolocationPage]
})
export class GeolocationPageModule {}
