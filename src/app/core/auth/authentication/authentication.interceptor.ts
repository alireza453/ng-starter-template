import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from 'app/core/auth/authentication/authentication.service';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authenticationInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthenticationService);

    // Clone the request object
    let newReq = req.clone({
        withCredentials: true,
    });

    // Response
    return next(newReq).pipe(
        catchError((error) => {
            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse && error.name == "HttpErrorResponse") {
                // Sign out
                authService.signOut();

                // Reload the app
                location.reload();
            }

            return throwError(error);
        })
    );
};
