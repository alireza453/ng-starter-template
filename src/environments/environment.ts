import { Environment } from '@abp/ng.core';


export const environment = {
    production: false,
    BASE_URL: 'https://localhost:44393/api',
    BASE_URL_DOMAIN: 'https://localhost:44393',
};

const UI_BASE_URL = 'http://localhost:4200';
const oAuthConfig = {
    issuer: environment.BASE_URL_DOMAIN,
    redirectUri: UI_BASE_URL,
    clientId: 'testabp_App',
    responseType: 'code',
    scope: 'email testabp',
    requireHttps: true,
};
export const authEnvironment = {
    production: false,
    application: {
        UI_BASE_URL,
        name: 'testabp',
    },
    oAuthConfig,
    apis: {
        default: {
            url: environment.BASE_URL_DOMAIN,
            rootNamespace: 'testabp',
        },
        AbpAccountPublic: {
            url: oAuthConfig.issuer,
            rootNamespace: 'AbpAccountPublic',
        },
    },
} as Environment

