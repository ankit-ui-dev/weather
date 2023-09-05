import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather/weather.component';
import { WeatherGraphComponent } from './weather/weather-graph/weather-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {  HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    WeatherComponent,
    WeatherGraphComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    NgApexchartsModule,
    HttpClientModule
  ],
  providers: [HttpClient
  ]
})
export class WeatherModule { }
