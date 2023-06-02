import api from 'shared/config/axiosInstance';
import { EventDataType} from '../types';
export interface EventType {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    count_of_visitors: number;
    description: string;
    org_id:string;
    place: {
      title: string;
      longitude: number;
      latitude: number;
    }
  }
export class eventApi {
  static getAll(){
    return api.get('event?sort=-created_at')
  }
  static createEvent(payload:EventDataType){
    return api.post('event', payload)
  }
  static getEventById(id:string){
    return api.get(`event/${id}`)
  }
  static deleteEvent(id: string, {is_deleted}:any) {
    return api.delete(`event/${id}`)
  }
  static updateEvent( id:string, payload:Partial<EventType>){
    return api.put(`event/${id}`, payload)
  }
}
