import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    ENVIRONMENT_INITIALIZER,
    EnvironmentProviders,
    Provider,
    inject,
} from '@angular/core';
import { authenticationInterceptor } from 'app/core/auth/authentication/authentication.interceptor';
import { AuthenticationService } from 'app/core/auth/authentication/authentication.service';

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideHttpClient(withInterceptors([authenticationInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(AuthenticationService),
            multi: true,
        },
    ];
};
