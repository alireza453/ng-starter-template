import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
    issuer: 'https://localhost:44393/',
    redirectUri: baseUrl,
    clientId: 'RavanYar_App',
    responseType: 'code',
    scope: 'openid profile phone offline_access email RavanYar',
    requireHttps: true,
};

export const environment = {
    production: false,
    application: {
        baseUrl,
        name: 'RavanYar',
    },
    oAuthConfig,
    apis: {
        default: {
            url: 'https://localhost:44393',
            rootNamespace: 'RavanYar',
        },
        AbpAccountPublic: {
            url: oAuthConfig.issuer,
            rootNamespace: 'AbpAccountPublic',
        },
    },
} as Environment;
