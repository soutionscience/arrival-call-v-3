import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import{} from 'google-maps'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from 'src/app/SERVICES/api.service';
import { GeofenceCalculatorService } from 'src/app/SERVICES/geofence-calculator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  places: any [];
  markers: any [] =[];
showAction: boolean;
service: any;
map: any;
infowindow: any;
locationsPacket :any []=[];

@ViewChild('map',{static: false}) mapElement: ElementRef

  constructor(private geoLocation: Geolocation, private api: ApiService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getLocation()

  }
  getLocation(){
   // console.log('test me ')
    this.geoLocation.getCurrentPosition()
    .then((resp)=>{
      let myOb = {}
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      myOb = {origin: {lat:lat, lng: lng}}
      this.locationsPacket.push(myOb)

      this.initializeMap(lat, lng);

    }).catch((error)=>{
      console.log('error geting location', error)
    })

  }
  initializeMap(lat, lng){
   // console.log('initialize')
    let userLocation  = new google.maps.LatLng(lat, lng);
    this.infowindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {center: userLocation, zoom: 15}
    );
    let marker = new google.maps.Marker({
      position: userLocation,
      map: this.map,
      title: 'You'
  
    })
    this.markers.push(marker)
    this.service = new google.maps.places.PlacesService(this.map)
  }
  search(p){
    !p? this.reset():
    this.service = new google.maps.places.AutocompleteService();
    this.service.getQueryPredictions({input: p}, (results, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.places = results;
          //.log(this.places[0])
        }else{
          console.log('error getting request')
        }
      })


  }
  reset(){
    this.places =[];
    this.showAction = false
  }

  selectPlace(p){
    console.log('selected ', p)
    this.service = new google.maps.places.PlacesService(this.map);
    //console.log('service ', this.service)
    var request = {
      placeId: p.place_id,
      fields: ['name', 'formatted_address', 'place_id', 'geometry']
    };
    this.service.getDetails(request,(result, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
       // console.log('location ', result.geometry.location.lat())
        let myOb ={}
        let lat = result.geometry.location.lat();
        let lng = result.geometry.location.lng();
        myOb ={destination: {lat, lng}};
        this.locationsPacket.push(myOb);

        this.api.postResource('trips', this.locationsPacket).subscribe(resp=>{
          console.log('resp? ', resp)
        })

      }

    })

  }

}
