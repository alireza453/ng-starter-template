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

export interface ResultLoginUserDto {
    result: number;
    description: string;
}
