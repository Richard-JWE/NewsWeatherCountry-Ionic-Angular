import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GetWeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetWeatherProvider {
 
  constructor(public http: HttpClient) {
  }

  getWeather(name: string, unit: string ): Observable<any> {

    return this.http.get("https://api.weatherbit.io/v2.0/current?city="+name+"&key=1ecaf94c7e7a413a9b0b34260c8f4ae8&units="+unit+"&include=minutely");
  }

}
