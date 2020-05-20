import { Injectable } from '@angular/core';
import { CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    console.log('canActivate caleed....');

    return new Promise((resolve, reject) => {
      this.getCurrentUser()
      .then(user => {
        this.router.navigate(['/members']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }

  getCurrentUser(){
    console.log('getCurrentUser caleed....');

    return new Promise<any>((resolve, reject) => {
      var username = localStorage.getItem('username'); 
      console.log(username);
        if (username) {
          resolve(username);
        } else {
          reject('No user logged in');
        }
    });
  }

}
