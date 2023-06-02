import api from 'shared/config/axiosInstance';
import { CampType } from 'shared/stores/camp/api/campApi';
import { Speaker } from 'widgets/EventCreation/ui/types';
import { Event } from 'widgets/EventDetail/ui/types';
export interface ProgramType {
    camp?: CampType;
    _id?:string | any;
    title: string;
    speaker: Speaker;
    description: string;
    is_main_room: boolean;
    room?:string;
    date:string;
    start_time: string;
    end_time: string;
    event?: Event;
    event_id?: string;
    camp_id:string;
    is_deleted?:boolean;
}
export class programApi {
  static getAll() {
    return api.get('programs/all?skip=0&limit=20&sort=-created_at')
  }
  static getProgramByid( id:string){
    return api.get(`programs/${id}`)
  }
  static createProgram(payload:ProgramType) {
    return api.post('programs/create', payload)
  }
  static deleteProgram(id:string){
    return api.delete(`programs/delete/${id}`)
  }
  static editProgram(id:string, payload:Partial<ProgramType>){
    return api.put(`programs/update/${id}`, payload)
  }
 
}
