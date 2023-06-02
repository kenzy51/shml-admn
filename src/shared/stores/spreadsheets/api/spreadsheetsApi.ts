import api from 'shared/config/axiosInstance';

export interface PermissionType {
  permissions:Array<string>;
}
export class spreadSheetsApi {
  static getAllTables(){
    return api.get('users/admin/spreadsheets')
  }
  static givePermission(id:string, payload:any){
    return api.post(`users/admin/spreadsheets/${id}`, payload)
  }
}
