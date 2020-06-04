import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private restangular: Restangular) { }

  postResource(route, resource): Observable<any>{
    return this.restangular.all(route).post(resource)
  }
  postTrip(route, userId, resource): Observable<any>{
    return resource
    //return this.restangular.one(route, userId).post(resource)
  }
}
