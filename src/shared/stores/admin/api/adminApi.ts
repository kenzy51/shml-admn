import api from 'shared/config/axiosInstance';

export interface AdminType{
    login:string;
    password:string;
    role?:string;
    full_name?:string;
    _id?:string;
}

export class adminApi {
  static createAdmin(payload:AdminType) {
    return api.post('users/create/admin', payload)
  }

}