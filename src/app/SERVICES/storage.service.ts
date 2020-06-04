import { Injectable } from '@angular/core';
import { Trip } from '../SHARED/models/trip.model';
import{ Storage} from '@ionic/storage'


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  trips: Trip[]=[]

  constructor(private storage: Storage) { }

  saveTrip(obj){
    let o= obj.body
    let trip: Trip
    trip.origin= o.origin_addresses;
    trip.destination = o.destination_addresses;
    trip.tripDuration = o.rows.elements.duration.text;
    this.trips.push(trip);
    this.storage.set('trips', this.trips)
    
  }

  getTrips(){
    return this.storage.get('trips')
    .then((resp)=>{
      this.trips =!resp? null: resp;
     return this.trips
        })
  }
}
