import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private _loaderService:LoaderService)
       {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  show = false;
  fullScreen = true;
  template = ``;

  onClickDefault() {
    this.show = true;
    this.fullScreen = true;
    this.template = ``;
    setTimeout(() => {
      this.show = false;
    }, 2000);
  }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  get registerError() {return  this.registerForm.controls}


  public onRegister(){
    if (this.registerForm.valid) {
    const formBody= this.registerForm.value;
    this.authService.setUser(formBody).subscribe(
      (res: any) => {
        Swal.fire(
          'Good job!',
          'You have succesfull Register',
          'success'
        )
        this.router.navigate(['/auth'])
      },
      (err: any) => {
        this._loaderService.loader.next(false);
        Swal.fire(
          'Oops!',
           err.error.message,
          'error'
        )
      }
    );
    }
  }
}
