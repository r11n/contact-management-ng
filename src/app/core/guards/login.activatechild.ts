import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginActivateChild implements CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/login');
        }
        return this.auth.isLoggedIn();
    }
}
