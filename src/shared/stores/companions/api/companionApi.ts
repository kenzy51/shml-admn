import api from 'shared/config/axiosInstance';

export interface CompanionType {
  _id?: string;
  name: string;
  description: string;
  icon_url: string;
  website_url: string;
  background_hex_color: string;
}
export interface CompanionTypeInterface {
  title: string;
  _id?: string;
}

export class companionApi {
  static getAll() {
    return api.get('companion')
  }
  static createCompanion(payload: CompanionType) {
    return api.post('companion', payload)
  }
  static deleteCompanion(id: string){
    return api.delete(`companion/${id}`)
  }
  static updateCompanion(id:string,payload:CompanionType){
    return api.put(`companion/${id}`, payload)
  }
 
  // for companion types
  static getCompanionType() {
    return api.get('companion-type')
  }

  static createCompanionType(payload:CompanionTypeInterface) {
    return api.post('companion-type', payload)
  }
  
  static deleteCompanionType(id:string) {
    return api.post(`companion-type/${id}`)
  }
  static updateCompanionType(id:string,payload:CompanionTypeInterface){
    return api.put(`companion-type/${id}`, payload)
  }
 
  // 
}