import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers:[Geolocation, HTTP],
  declarations: [HomePage]
})
export class HomePageModule {}
