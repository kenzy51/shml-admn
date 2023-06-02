import api from 'shared/config/axiosInstance'

export interface UserRegistrationType {
  full_name:string;
  phone:string;
  ticket_code: string;
}
export class userRegistrationApi {
  static registerUser(payload:UserRegistrationType,id:string){
    return api.post(`users/event/${id}`, payload)
  }
}