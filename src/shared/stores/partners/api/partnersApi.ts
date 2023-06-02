import api from 'shared/config/axiosInstance';
import { TagType } from 'shared/stores/tag/api/tagApi';

export interface PartnerType {
  _id?: any;
  icon_url: string;
  title: string;
  description: string;
  background_color: any;
  is_deleted?: boolean;
}

export interface PartnerServiceType {
  icon_url: string;
  details: string
}

export class partnerApi {
  static getAll() {
    return api.get('partner')
  }
  
  static getPartnerById(id:string){
    return api.get(`partner/id/${id}`)
  }

  static createPartner(payload: PartnerType) {
    return api.post('partner/create', payload)
  }

  static deletePartner(id: string) {
    return api.delete(`partner/delete/${id}`)
  }

  static updatePartner(id: string, payload: PartnerType) {
    return api.put(`partner/update/${id}`, payload)
  }

  static assignTagToPartner(id: string, payload: TagType) {
    return api.post(`partner/assign_tag/${id}`, payload)
  }

  static addServiceToPartner(id: string, payload: PartnerServiceType) {
    return api.post(`partner/add/service/${id}`, payload)
  }
}