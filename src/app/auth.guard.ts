import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
 
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(
        private router:Router, 
        private authService: AuthService ) {}

    /**
     * This function return boolean true/false
     * as per the user login status
     * @param route 
     * @param state 
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean|UrlTree {

        // Check the user is logged in or not
        if (!this.authService.isUserLoggedIn()) {
            this.router.navigate(["login"], { 
                queryParams: { retUrl: route.url} 
            });
            return false;
        } 
        return true;
    } 
}
 
