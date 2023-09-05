import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  loader: boolean = false;
  constructor(private _loaderService: LoaderService) {
    this._loaderService.loader.subscribe((res: any) => {
        this.loader = res;
    });
  }
  
}
