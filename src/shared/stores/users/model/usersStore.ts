import { usersApi, User } from '../api/usersApi';
import { makeAutoObservable } from 'mobx';

export class UsersStore {
  users: any= [];

  constructor() {
    makeAutoObservable(this);
  }

  async getUsers() {
    try {
      const response = await usersApi.getAll();
      this.users = response.data.items.filter((user: User) => user._id !== '');
    } catch (error) {
      console.error('Error while fetching users: ', error);
    }
  }
}
export const usersStore = new UsersStore();