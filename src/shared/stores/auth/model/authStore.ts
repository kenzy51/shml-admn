import { makeAutoObservable } from 'mobx';
import { getToken, saveToken } from 'shared/config/axiosInstance/axiosInstance';
import { fetchAction } from 'shared/lib/axiosWrapper/axiosWrapper';
import { AuthApi } from '../api/authApi';
import { UserDataType } from '../api/types';

class AuthStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth = () => {
    this.isAuth = !!getToken();
  };
  sendAuth = async (payload: UserDataType) => {
    try {
      const { data } = await fetchAction(AuthApi.sendAuth(payload), { show: true });
      saveToken(data.access_token);
      this.setIsAuth();
    } catch (error) {
      console.error(error);
    }
  }
}

export const authStore = new AuthStore();