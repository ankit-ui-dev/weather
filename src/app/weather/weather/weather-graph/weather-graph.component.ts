import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';
import { WeatherService } from '../../weather.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherGraphComponent implements OnInit, OnChanges {
  @Input() reqSearch: any;
  public weatherForecastList: any;
  public apexShow: boolean = false;
  public weatherGraphOptions!: Partial<ChartOptions> | any;
  public commonOptions: Partial<ChartOptions> | any = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    toolbar: {
      tools: {
        selection: false,
        download: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      },
    },
    markers: {
      size: 6,
      hover: {
        size: 10,
      },
    },
    tooltip: {
      followCursor: false,
      theme: 'dark',
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
    grid: {
      clipMarkers: false,
    },
    xaxis: {
      type: 'datetime',
    },
  };

  constructor(public _weatherService: WeatherService) {}
  ngOnInit(): void {
    this.getForecast(this.reqSearch);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['reqSearch']?.firstChange) {
      return;
    }

    this.getForecast(this.reqSearch);
  }

  public getForecast(cityName: any) {
    this._weatherService.getForecast(cityName).subscribe((res: any) => {
      this.weatherForecastList = res.list;

      this.initCharts();
    });
  }

  public initCharts(): void {
    this.weatherGraphOptions = {
      series: [
        {
          name: 'weather graph',
          data: this.generateDayWiseTimeSeries(new Date().getTime(), 14),
        },
      ],
      chart: {
        id: 'yt',
        group: 'social',
        type: 'area',
        height: 300,
      },
      colors: ['#5C9CE5'],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40,
        },
      },
    };
  }

  public generateDayWiseTimeSeries(baseval: any, count: any): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      // get todays data
      var x = baseval;
      let filteredData = this.weatherForecastList?.filter(
        (forecast: any) =>
          new Date(forecast.dt * 1000).getDate() == new Date(x).getDate()
      );
      var y = (filteredData?.[0]?.temp?.day - 273.15).toFixed(2);
      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
