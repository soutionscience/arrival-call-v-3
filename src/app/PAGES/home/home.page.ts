import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import{} from 'google-maps'
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  places: any [];
showAction: boolean;
service: any;
map: any;

@ViewChild('map',{static: false}) mapElement: ElementRef

  constructor(private geoLocation: Geolocation) { }

  ngOnInit() {
  }
  onViewWillEnter(){
    this.getLocation()

  }
  getLocation(){
    this.geoLocation.getCurrentPosition()
    .then((resp)=>{
      let lat = resp.coords.latitude;
      let lng = resp.coords.longitude;
      this.initializeMap(lat, lng);

    }).catch((error)=>{
      console.log('error geting location', error)
    })

  }
  initializeMap(lat, lng){
    let userLocation  = new google.maps.LatLng(lat, lng);
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {center: userLocation, zoom: 15}
    );
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
    this.service = new google.maps.places.PlacesService(this.map);
    console.log('service ', this.service)
    var request = {
      placeId: p.place_id,
      fields: ['name', 'formatted_address', 'place_id', 'geometry']
    };
    this.service.getDetails(request,(result, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(result.geometry.location)
      }

    })

  }

}
