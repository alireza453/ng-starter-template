import { Environment } from '@abp/ng.core';

export const environment = {
    production: true,
    BASE_API: 'https://localhost:44357/api',
    BACKEND_BASE_URL: 'https://localhost:44357',
    UI_BASE_URL : 'http://localhost:4200'
};


const oAuthConfig = {
    issuer: environment.BACKEND_BASE_URL,
    redirectUri: environment.UI_BASE_URL,
    clientId: 'testabp_App',
    responseType: 'code',
    scope: 'email testabp',
    requireHttps: true,
};
export const authEnvironment = {
    production: true,
    application: {
        baseUrl:environment.UI_BASE_URL,
        name: 'testabp',
    },
    oAuthConfig,
    apis: {
        default: {
            url: environment.BACKEND_BASE_URL,
            rootNamespace: 'testabp',
        },
        AbpAccountPublic: {
            url: oAuthConfig.issuer,
            rootNamespace: 'AbpAccountPublic',
        },
    },
} as Environment;
