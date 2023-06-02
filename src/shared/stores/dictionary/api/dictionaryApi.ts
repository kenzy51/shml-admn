import api from 'shared/config/axiosInstance';

export interface DictionaryType {
    shabook_link: string;
    policy_link: string;
    map_link: string;
    contacts?:any;
  }
  
export class dictionaryApi {
  static getList() {
    return api.get('dictionary')
  }
  
  static createDictionary(payload:DictionaryType) {
    return api.post('dictionary', payload)
  }

}
