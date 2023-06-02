import api from 'shared/config/axiosInstance';

export interface Picture {
    url: string;
    title: string;
}

export interface Contacts {
    instagram: string;
    email: string;
    phone: string;
}

export interface Speaker {
    _id?: string | undefined;
    full_name: string;
    description: string;
    is_main_scene:boolean
    picture: Picture;
    event_id?:any;
}


export class speakerApi {
  static getAll(id:string) {
    return api.get(`event/${id}/speaker`)
  }
  static createSpeaker(id:string, payload:Speaker){
    return api.post(`event/${id}/speaker`, payload)
  }
}
  