import { makeAutoObservable } from 'mobx';
import { PermissionType, spreadSheetsApi } from '../api/spreadsheetsApi';


class SpreadsheetsStore {
  spreadSheets = [];
  permissions:any = [];
  constructor() {
    makeAutoObservable(this);
  }
  // 
  async getAllTables() {
    try {
      const response = await spreadSheetsApi.getAllTables();
      const filteredSheets = response.data.filter((sheet:any) => !sheet.is_deleted)
      this.spreadSheets = filteredSheets
    } catch (error) {
      console.error('Failed to get programs', error);
    }
  }
  // 
  async givePermission(id:string, payload:PermissionType) {
    try {
      const response = await spreadSheetsApi.givePermission(id,payload);
      this.permissions.push(response.data)
    } catch (error) {
      console.error('Failed to give permission', error);
    }
  }
  
}

export const spreadsheetsStore = new SpreadsheetsStore();
