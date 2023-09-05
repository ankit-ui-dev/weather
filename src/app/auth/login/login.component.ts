import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router} from '@angular/router';

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
    private route: ActivatedRoute
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
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
            localStorage.setItem('user',res.data.firstName + ' ' +res.data.lastName  );
              // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              // this._router.navigateByUrl(returnUrl);
              this._router.navigate(['/'])
          },
          error: error => {
          }
      }
      )
    }
  }
}
