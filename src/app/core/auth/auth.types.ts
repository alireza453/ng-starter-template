export interface RegisterUserDto {
    userName: string;
    emailAddress: string;
    password: string;
    appName: string;
}

export interface LoginUserDto {
    userNameOrEmailAddress: string;
    password: string;
    rememberMe: true;
}

export interface ResultLoginDto {
    result: number;
    description: string;
}

export interface RequestTokenDto {
    grant_type: string;
    username: string;
    password: string;
    client_id: string;
    scope: string;
}

export interface ResponseTokenDto {
    access_token: string;
    token_type: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
}
