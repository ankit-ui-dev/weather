import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { WeatherService } from '../weather.service';
import { debounceTime, fromEvent, map } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, AfterViewInit {
  @ViewChild('inputField') inputField: ElementRef | undefined;
  public reqSearch = 'Delhi';
  public user: any;
  public sunrise: any;
  public sunset: any;
  public weatherInfo: any;
  public celsius: any;
  public TimeStamp: any;
  public weatherReport: any;

  public cities = ['Delhi', 'Antarctica', 'Mumbai', 'Ireland'];

  // @Output() childEvent = new EventEmitter<string>();

  constructor(
    private _weatherService: WeatherService,
    private _loaderService: LoaderService,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    const searchTerm = fromEvent(this.inputField?.nativeElement, 'keyup').pipe(
      map((event: any) => {
        this._loaderService.loader.next(true);
        return event.target.value;
      }),
      debounceTime(500)
    );
    searchTerm.subscribe((res: any) => {
      this.reqSearch = res;
      this.weatherCall(this.reqSearch);
      this._loaderService.loader.next(false);
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.weatherCall(this.reqSearch);
  }

  public weatherCall(cityName: any) {
    this._weatherService.getWeather(cityName).subscribe(
      (res: any) => {
        this.reqSearch = res.name;
        this.weatherReport = res;
        this.celsius = Math.round(res?.main.temp - 273.15);
        this.sunrise = new Date(res.sys.sunrise * 1000).toLocaleTimeString();
        this.sunset = new Date(res.sys.sunset * 1000).toLocaleTimeString();
        let time: any = new Date(res.dt * 1000);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
        };

        this.TimeStamp = time.toLocaleDateString('en-US', options);
      },
      (error) => {
        this._loaderService.loader.next(false);
        Swal.fire({
          title: 'Sorry ! ' + error.error.message,
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            this.weatherCall('delhi');
          }
        });
      }
    );
  }
  public signOff() {

    Swal.fire({
      title: 'Are you sure to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
    this._router.navigate(['/auth']);
      } else if (result.isDenied) {
      }
    })
    
  }
}
