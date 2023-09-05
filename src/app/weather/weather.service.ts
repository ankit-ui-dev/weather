import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private apiKey = '3d8b309701a13f65b660fa2c64cdc517';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/';

  getWeather(cityName:string) {
    console.log(this.http.get(this.apiUrl + `forecast/daily?cnt=14&appid=${this.apiKey}&q=${cityName}`))
    return this.http.get(this.apiUrl + `weather?appid=${this.apiKey}&q=${cityName}`);
  }

  getForecast(cityName:string){
    return this.http.get(this.apiUrl + `forecast/daily?cnt=14&appid=${this.apiKey}&q=${cityName}`);
  }
}
