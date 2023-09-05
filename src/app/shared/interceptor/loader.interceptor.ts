import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: any) => {
        this._loaderService.loader.next(true)
        if (event.type == HttpEventType.Response) {
          if (event.status == 200) {
            this._loaderService.loader.next(false);
          }
          else{
            this._loaderService.loader.next(false);
          }
        }
      })
    );
  }
}
