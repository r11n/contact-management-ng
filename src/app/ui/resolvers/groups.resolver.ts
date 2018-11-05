import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class GroupsResolver implements Resolve<any> {
    constructor(private api: ApiService) {}
    resolve(route: ActivatedRouteSnapshot) {
        return this.api.get('/groups');
    }
}
