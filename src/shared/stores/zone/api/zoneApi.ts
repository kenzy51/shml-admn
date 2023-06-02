import api from 'shared/config/axiosInstance';

export interface ZoneType {
    _id?:string | undefined | any;
    title:string;
    description:string;
    img_url:string;
    tag_id:string;
    is_deleted?:boolean;
  }
export class zoneApi{
  static getAll(){
    return api.get('zone/all')
  }
  static createZone(payload:ZoneType){
    return api.post('zone/create', payload)
  }
  static deleteZone(id:string){
    return api.delete(`zone/${id}`)
  }
  static updateZone(id:string, payload:ZoneType){
    return api.put (`zone/${id}`, payload)
  }
}