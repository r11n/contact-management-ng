import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GroupsResolver implements Resolve<any> {
    constructor(private api: ApiService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot) {
        return this.api.get('/groups').pipe(catchError(this.erroCatcher));
    }

    erroCatcher(error: any) {
        if (error.status === 401) {
            localStorage.clear();
            location.reload();
        }
        if ([500, 401, 0].indexOf(error.status) === -1) {
            location.reload();
        }
        return throwError(error);
    }
}
