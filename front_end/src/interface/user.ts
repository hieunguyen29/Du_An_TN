export  interface IUser {
    hinh: any;
    id: number;
    name: string;
    image: string;
    dia_chi: string;
    email: string;
    sdt: string;
    cccd: string;
    password:string;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    roles: IRole[];
    permissions:IPermission[];
}

export interface IRole {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: IPermission[];
}

export interface IPermission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}