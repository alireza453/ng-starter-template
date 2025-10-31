// Types
export type Scheme = 'mylight' | 'mydark';
export type Screens = { [key: string]: string };
export type LayoutDirection = 'rtl' | 'ltr';

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface FuseConfig {
    layout: string;
    scheme: Scheme;
    screens: Screens;
    layoutDirection: LayoutDirection;
}
