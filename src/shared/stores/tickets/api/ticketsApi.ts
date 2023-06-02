import api from 'shared/config/axiosInstance';

export class ticketsApi {
  static uploadTicket(id:any, payload:any){
    return api.post(`ticket/${id}`, payload)
  }
}