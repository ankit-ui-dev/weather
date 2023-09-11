import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _router:Router,
    private authService:AuthService,
    private route: ActivatedRoute,
    private _loaderService:LoaderService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required]]
    });
  }

  get loginError() {return  this.loginForm.controls}

  ngOnInit(): void {
    if(this.authService.isUserLogedIn()){
       this._router.navigate(['/'])
     }
    
  }
  onLogin(){
    if (this.loginForm.valid) {
      const body= this.loginForm.value;
      this.authService.checkUser(body).subscribe(
        {
          next: (res:any) => {
           const accessToken = res.metaData["access-token"]
            localStorage.setItem('Access-token',accessToken);
            localStorage.setItem('user',res.data.firstName + ' ' +res.data.lastName);
              this._router.navigate(['/'])
          },
          error: error => {
            console.log(error)
            this._loaderService.loader.next(false);
            Swal.fire(
              'Oops!',
               error.error.error,
              'error'
            )
          }
      }
      )
    }
  }
}
