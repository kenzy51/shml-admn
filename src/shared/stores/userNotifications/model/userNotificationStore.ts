import { UserNotificationType,userNotificationApi  } from '../api/userNotificationsApi';
import { makeAutoObservable } from 'mobx';

export class UserNotificationStore {
  userNotifications: UserNotificationType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addUserNotification(notification: UserNotificationType) {
    this.userNotifications.push(notification)
  }

  async getAlluserNotifications() {
    try {
      const response = await userNotificationApi.getAll();
      const filtereduserNotifications = response.data.items.filter((notification: UserNotificationType) => !notification.is_deleted);  
      this.userNotifications = filtereduserNotifications;
    } catch(error) {
      console.error(error)
    }
  }

  async createUserNotification(payload: UserNotificationType) {
    try {
      const response = await userNotificationApi.createUserNotification(payload);
      const userNotification = response.data;
      this.addUserNotification(userNotification);
    } catch(error) {
      console.error('error', error)
    }
  }

  async deleteUserNotification(_id: string) {
    await userNotificationApi.deleteUserNotification(_id);
    this.userNotifications = this.userNotifications.filter(notification => notification._id !== _id)
  }
}

export const userNotificationStore = new UserNotificationStore();