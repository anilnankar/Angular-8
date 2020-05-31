import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { of } from 'rxjs';

@Injectable()
export class AuthService { 
 
    public isloggedIn: boolean;
    public userName:string;
 
    constructor() {
        this.isloggedIn=false;
    }
 
    login(username: string, password:string) {
        if(username != "admin" && password != "123456") {
            this.isloggedIn=false;
            return of(this.isloggedIn);
        }

        localStorage.setItem('username', username);
        this.isloggedIn=true;
        this.userName=username;
        return of(this.isloggedIn);
    }
 
    isUserLoggedIn(): boolean {
        return localStorage.getItem('username') != null;
    }
    
    logoutUser(): void{
        localStorage.setItem('username', "");
        localStorage.removeItem('username');
        this.isloggedIn = false;
    }
 
} 
 
