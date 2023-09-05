
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl=environment.baseUrl;

  constructor(private http: HttpClient) { }

  isUserLogedIn(){
    return !!localStorage.getItem('Access-token');
  }

  setUser(body:any) {
    return this.http.post(this.baseUrl + `auth/signup`,body)
  }

  checkUser(body:any) {
    return this.http.post(this.baseUrl + `auth/login`,body)
  }
}
