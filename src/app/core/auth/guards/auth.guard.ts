import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(AuthService)
        .loadUserFromLocalStorage()
        .pipe(
            switchMap((user) => {
                // If the user is not authenticated...
                if (!user) {
                    // Redirect to the sign-in page with a redirectUrl param
                    const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                    const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                    console.log('Redirecting to', urlTree);
                    return of(urlTree);
                }

                // Allow the access
                return of(true);
            }),
        );
};
