export interface IRegisterUserCreateDTO {
    fullName: string;
    username: string;
    password: string;
}


export interface IUser {
    id?: number;
    fullName?: string;
    username?: string;
    password?: string;
}

export interface ILoginDTO {
    username: string;
    password: string;
}

export interface IChangePasswordDTO {
    id?: number;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}