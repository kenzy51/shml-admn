import { makeAutoObservable } from 'mobx';
import { AdminType, adminApi} from '../api/adminApi'
export interface AdminResponseType {
  id: string;
  login: string;
  password:string;
}

export class AdminStore {
  admins: AdminResponseType[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  addAdmin(admin: AdminResponseType) {
    this.admins.push(admin);
  }

  async createAdmin(adminData: AdminType) {
    try {
      this.setIsLoading(true);
      const response = await adminApi.createAdmin(adminData);
      const admin: AdminResponseType = {
        id: response.data.id,
        login: adminData.login,
        password:adminData.password
      };
      this.addAdmin(admin);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}

export const adminStore = new AdminStore();
