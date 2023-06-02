import api from 'shared/config/axiosInstance';

export interface TagType {
    _id?:string | undefined | any;
    name: string;
    is_deleted?: boolean;
 
  }
export class tagApi{
  static getAll(){
    return api.get('tag/all')
  }
  static createTag(payload:TagType){
    return api.post('tag/create', payload)
  }
  static deleteTag(id:string){
    return api.delete(`tag/${id}`)
  }
  static updateTag(id:string, payload:TagType){
    return api.put(`tag/${id}`,payload)
  }
  
}