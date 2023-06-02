import { makeAutoObservable } from 'mobx';
import { ticketsApi } from '../api/ticketsApi';

class TicketStore {
  ticketsData :any = [];

  constructor(){
    makeAutoObservable(this)
  }
  
  uploadData(data:any){
    this.ticketsData.push(data)
  }

  async uploadFile(id:any, file:File){
    try{
      const formData = new FormData();
      formData.append('file',file);
      const response = await ticketsApi.uploadTicket(id, formData)
      this.ticketsData = response.data
    }
    catch(error){
      console.error(error)
    }
  }
}
export const ticketStore = new TicketStore();