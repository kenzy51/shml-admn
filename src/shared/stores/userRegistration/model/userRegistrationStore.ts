import { makeAutoObservable } from 'mobx';
import { UserRegistrationType, userRegistrationApi } from '../api/userRegistrationApi';

export class UserRegistrationStore {
  users: UserRegistrationType[] = [];
  constructor() {
    makeAutoObservable(this)
  }
  async registerUser(userData: UserRegistrationType, id: string) {
    try {
      const response = await userRegistrationApi.registerUser(userData, id);
      this.users.push(response.data);
    } catch (error) {
      console.error(error);
    }
  }

}
export const userRegistrationStore = new UserRegistrationStore();