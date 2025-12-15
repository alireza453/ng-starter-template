import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { authGuard, AuthGuard } from '@abp/ng.core';

// prettier-ignore
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to 'ravanyar/dashboard/home'
    {
        path: '', pathMatch: 'full', redirectTo: 'dashboard/home' ,
    },

    // Redirect signed-in user to the 'ravanyar/dashboards/home'
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'dashboard/home',
    },

    // Auth routes for guests
    {
        path: '',

        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes'),
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes'),
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes'),
            },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes'),
            },
        ],
    },

    /*
    Ravanyar routes
     */
    {
        path: '',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'dashboard', children: [
                    //home page
                    {
                        path: 'home',
                        loadChildren: () => import('app/modules/admin/home/home.routes'),
                    },
                    {
                        path: 'base-info',
                        loadChildren: () => import('app/modules/admin/base-info/base-info.routes'),
                    },
                    {
                        path: 'user-management',
                        loadChildren: () => import('app/modules/admin/user-management/user-management.routes'),
                    },
                    {
                        path: 'roles-management',
                        loadChildren: () => import('app/modules/admin/roles-management/roles-management.routes'),
                    },
                ]
            },
            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes'),
            },
            { path: '**', redirectTo: '404-not-found' },
        ],
    },


];
