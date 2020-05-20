import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidCredentialMsg: string;
  username:string;
  password:string;
  retUrl:string="login";
  submitted = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService, 
              private appService: AppService, 
              private router: Router, 
              private activatedRoute:ActivatedRoute) {
  }


  /** 
   * Function to set login form
  */
  ngOnInit() {
    if(this.authService.isloggedIn) {
      this.router.navigate( ['members']);
    }

    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    
    this.activatedRoute.queryParamMap
            .subscribe(params => {
        this.retUrl = params.get('retUrl'); 
        console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
    });
  }

  /** 
   * Function authenticate the user
  */
  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(data => {
      console.log('data='+data);
      if(data) {
        this.invalidCredentialMsg = "";
        if (this.retUrl!=null) {
          this.router.navigate( [this.retUrl]);
        } else {
            this.appService.setUsername(this.loginForm.value.username);
            this.router.navigate( ['members']);
        }
      }
      else {
        this.invalidCredentialMsg = "Username/Password is incorrect.";
        this.router.navigate( ['members']);
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

}
