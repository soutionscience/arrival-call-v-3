import { Component, OnInit } from '@angular/core';
import { Geofence } from '@ionic-native/geofence/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  currentLocation: any;
  success: any []=[];
  errors: any [] =[];
  movingLocations: any [] =[];
  locationsLength: number
  geoLength: number;
  myFence: any;
  geoFences: any []=[];
  geoWatch: any []=[];

  constructor(private geofence: Geofence, private geolocation: Geolocation, 
    private platform : Platform, 
    private alertCtrl: AlertController) {
      this.platform.ready().then(()=>{
          // initialize the plugin
      geofence.initialize().then(
        // resolved promise does not return a value
        () => this.success.push('geofence initialized'),
        (err) => this.errors.push(err)
      )

      })
    
    
  }

  ngOnInit() {
  }
  getMyLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
     this.currentLocation = resp // resp.coords.latitude
     console.log('lat ', this.currentLocation.coords.latitude)
     console.log('long', this.currentLocation.coords.longitude)
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }
  private addGeofence(location) {
    //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude:       location.coords.latitude, //center of geofence radius
      longitude:      location.coords.longitude,
      radius:         2, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'You just arrived to Gliwice city center.', //notification body
          openAppOnClick: true ,//open app when notification is tapped
         vibrate: [1000, 500, 2000]

      }
    }
    this.myFence = fence;
  
    this.geofence.addOrUpdate(fence).then(
       () => {this.success.push('geofence updated... starting watch'); this.watch()},
       (err) => this.errors.push('Geofence failed to add')
     );

     this.geofence.getWatched().then((geofenceJson)=>{
       console.log('geowatcgh ', JSON.parse(geofenceJson) )
       this.geoWatch.push(geofenceJson)
     })

     this.geofence.onTransitionReceived().subscribe((geo)=>{
       this.presentAlert()
       this.geoFences.push(geo)
       geo.forEach((element)=>{
         this.geoFences.push(element)
         this.geoLength = this.geoFences.length
       })
     })
  }

  watch(){
    let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
  this.movingLocations.push(data)
  this.locationsLength = this.movingLocations.length
  });
  }

  async presentAlert(){
    const alert = await this.alertCtrl.create(
      {cssClass: 'my custom alert',
     header:'Alert',
    subHeader: 'location update',
   message: 'You have left/arrive the location',
 buttons: ['OK']}
    );
    await alert.present()
  }


}
