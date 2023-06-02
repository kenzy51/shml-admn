import api from 'shared/config/axiosInstance';

export interface CampType {
    label:string;
    _id?:string | undefined | any;
    name: string;
    description:string;
    icon_url?:string;
    img_url?:string;
    event_id:string;
    is_deleted?:boolean;
    zone_ids?:any;
  }
export class campsApi{
  static getAll(){
    return api.get('camp')
  }
  static getCampById(id:string){
    return api.get(`camp/find/${id}`)
  }
  static createCamp(payload:CampType){
    return api.post('camp/create', payload)
  }
  static deleteCamp(id:string){
    return api.delete(`camp/delete/${id}`)
  }
  static assignZoneToCamp(campId:string, payload:any){
    return api.post(`camp/assign_zone/${campId}`, payload)
  } 
  static assignPartnerToCamp(campId:string, payload:any){
    return api.post(`camp/add/partner/${campId}`, payload)
  }
}