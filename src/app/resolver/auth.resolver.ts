import { tap, mergeMap } from 'rxjs';
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class AuthResolver implements Resolve<void> {
    constructor(private authService: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot) {

        let token = {
            success: route.queryParams['approved'],
            request_token: route.queryParams['request_token']
        };

        if (token.success === 'true') {
            this.authService.login(token.request_token).subscribe();

            this.router.navigate(['/movies/all']);
        }
    }
}