import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//restagular
import{RestangularModule} from 'ngx-restangular'
import { restangularConfigFactory } from './shared/restangular.config';
import { HTTP } from '@ionic-native/http/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
    RestangularModule.forRoot(restangularConfigFactory)],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
