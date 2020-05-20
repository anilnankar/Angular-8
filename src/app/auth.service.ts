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
        localStorage.setItem('username', username);
        this.isloggedIn=true;
        this.userName=username;
        return of(this.isloggedIn);
    }
 
    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }
    
    logoutUser(): void{
        localStorage.removeItem('username');
        this.isloggedIn = false;
    }
 
} 
 
