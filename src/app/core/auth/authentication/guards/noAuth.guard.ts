import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'app/core/auth/authentication/authentication.service';
import { of, switchMap } from 'rxjs';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (
    route,
    state
) => {
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(AuthenticationService)
        .loadUserFromLocalStorage()
        .pipe(
            switchMap((user) => {
                // If the user is authenticated...
                if (user) {
                    return of(router.parseUrl(''));
                }

                // Allow the access
                return of(true);
            })
        );
};
