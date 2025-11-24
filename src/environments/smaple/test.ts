import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
    issuer: 'https://localhost:44357/',
    redirectUri: baseUrl,
    clientId: 'testabp_App',
    responseType: 'code',
    scope: 'openid profile phone offline_access email testabp',
    requireHttps: true,
};

export const environment = {
    production: false,
    application: {
        baseUrl,
        name: 'testabp',
    },
    oAuthConfig,
    apis: {
        default: {
            url: 'https://localhost:44357',
            rootNamespace: 'testabp',
        },
        AbpAccountPublic: {
            url: oAuthConfig.issuer,
            rootNamespace: 'AbpAccountPublic',
        },
    },
} as Environment;
