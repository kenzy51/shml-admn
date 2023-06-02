import api from 'shared/config/axiosInstance';


export type User = {
    _id: string;
    login: string;
    role: 'user';
    is_deleted: boolean;
    is_active: boolean;
    is_verified: boolean;
    is_banned: boolean;
    created_at: string;
    updated_at: string;
    __v: number;
    contacts: {
      instagram: string;
      email: string;
      phone: string;
      _id: string;
    };
    details: {
      look_for: string;
      can_do: string;
      city: string;
      _id: string;
    };
    full_name: string;
    job_title: string;
    work_place: string;
  };
  
  
export class usersApi {
  static getAll(){
    return api.get('users')
  }

}



