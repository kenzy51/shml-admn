import api from 'shared/config/axiosInstance';
import {AxiosResponse} from 'axios';
import { AuthDataType, UserDataType } from './types';

export class AuthApi {

  static sendAuth (payload:UserDataType): Promise<AxiosResponse<AuthDataType>> {
    return api.post('auth/signin/admin', payload);
  }
}




