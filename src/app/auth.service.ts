import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { of } from 'rxjs';

@Injectable()
export class AuthService { 
 
    private isloggedIn: boolean;
    private userName:string;
 
    constructor() {
        this.isloggedIn=false;
    }
 
    login(username: string, password:string) {
 
        //Assuming users are provided the correct credentials.
        //In real app you will query the database to verify.
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
 
