import {
    CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot, Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth/auth.service'

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private authSvc: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean {
        if (this.authSvc.getUserInfo()) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }

}