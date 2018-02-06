import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class ServerService {
  
  constructor(private http: Http) {};

    addRegion(region  ) {
        return this.http.post('http://localhost:8081/regions', region);
    }

    deleteRegion(regionId: number  ) {
      return this.http.delete('http://localhost:8081/regions/' + regionId);
  }


    storeServers(servers : any[] ) {
      return this.http.post('http://localhost:8081/regions', servers);
  }

    getRegions() {
      return this.http.get('http://localhost:8081/regions?sort=regionName')
      .map(
         (response: Response) =>  {
           const data = response.json();
           return data['_embedded'];
         }
      )
      .catch(
      (error: Error) =>  {
        console.log("something went wrong");
        return Observable.throw(error);

      }
      ) 

    }



   

  
}
