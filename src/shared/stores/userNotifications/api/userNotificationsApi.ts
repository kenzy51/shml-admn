import api from 'shared/config/axiosInstance';


export interface UserNotificationType {
    title:string;
    body:string;
    is_deleted?: boolean;
    _id:string;
}
export class userNotificationApi {
  static getAll() {
    return api.get(`user-notifications`)
  }
  //   
  static createUserNotification(payload:UserNotificationType){
    return api.post(`user-notifications`, payload)
  }
  //   
  static deleteUserNotification(id:string){
    return api.delete(`user-notifications/${id}`)
  }
}
  