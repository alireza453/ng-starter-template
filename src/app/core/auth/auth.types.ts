export interface RegisterUserDto {
    userName: string;
    emailAddress: string;
    password: string;
    appName: string;
}

export interface RequestLoginDto {
    userNameOrEmailAddress: string;
    password: string;
    rememberMe: true;
}

export interface ResultLoginDto {
    result: number;
    description: string;
}
export interface User {
    userName: string,
    email: string,
    name: string,
    surname: string,
    phoneNumber: string,
    isExternal: boolean,
    hasPassword: boolean,
    concurrencyStamp: string,
    extraProperties: {}
}


