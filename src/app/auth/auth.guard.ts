import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService:AuthService) {}

  private isAuthenticated: boolean = false;
  canActivate() {
      if(this.authService.isUserLogedIn()){
        return true;
       }
       else{
        this.router.navigate(['/auth']);
        return false;
       }
  }

  // canActivate(): boolean {
  //   // Check if the user is authenticated (you can use a service for this)
  //   // const isAuthenticated = false; // Replace with your actual authentication check

  //   const _accesstoken =

  //   if (_accesstoken) {
  //     this.isAuthenticated = true;
  //     this.router.navigate(['']);
  //     return true;
  //   } else {

  //     // User is not authenticated, redirect to the login page
  //     this.router.navigate(['/auth']);
  //     this.isAuthenticated= false;
  //     return false;
  //   }
  // }
}
