import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeofenceCalculatorService {

  constructor(private http: HTTP) { }

  checkIfInside(){

  }

  calculateGeofence=( lng1, lat1, lng2, lat2)=>{
   // let c =Math.sin(Math.)

  }
 // getResponce():Observable<any>{
   // return this.http.get()
 // }
  async getData() {
    try {
      let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=-1.254445,36.775298&destinations=-1.261332,36.798153&language=fr-FR&key=AIzaSyCeaJfi89zeC-wzhEXtrlgnwRT4_VL5Fsc'
      const params = {};
      const headers = {};

      const response = await this.http.get(url, params, headers);

      console.log(response.status);
      console.log(JSON.parse(response.data)); // JSON data returned by server
      console.log(response.headers);

    } catch (error) {
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
    }
  }
}
