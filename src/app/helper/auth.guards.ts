
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        var isAuthenticated = this.authService.checkLogin();
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }
        return isAuthenticated;
    }
}