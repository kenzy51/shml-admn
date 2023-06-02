import {makeAutoObservable} from 'mobx'
import { CampType, campsApi } from '../api/campApi'

export class CampStore{
  camps: CampType[]=[]
  constructor(){
    makeAutoObservable(this);
  }
  addCamp(camp:CampType){
    this.camps.push(camp)
  }

  async getAllCamps() {
    try {
      const response = await campsApi.getAll()
      const camps = response.data.items;
      const filteredCamps = camps.filter((camp:CampType)=> !camp.is_deleted)
      this.camps = filteredCamps
    } catch (error) {
      console.error(error)
    }
  } 

  async getCampById(id:string) {
    try {
      const response = await campsApi.getCampById(id)
      const eachCamp = response.data ;
      return eachCamp;
    } catch (error) {
      console.error(error)
    }
  }

  async createCamp(camp: CampType) {
    try {
      const response = await campsApi.createCamp(camp)
      this.camps.push(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteCamp(_id:string){
    await campsApi.deleteCamp(_id);
    this.camps = this.camps.filter(camp => camp._id !== _id)
  }

  async assignZoneToCamp(campId:string, payload:string){
    try{
      const response = await campsApi.assignZoneToCamp(campId, payload);
      this.camps.push(response.data)
    }
    catch(error){
      console.error(error,'err')
    }
  }
  async assignPartnerToCamp(campId:string, payload:string){
    try{
      const response = await campsApi.assignPartnerToCamp(campId, payload);
      this.camps.push(response.data)
    }
    catch(error){
      console.error(error,'err')
    }
  }

  
}

export const campStore = new CampStore();
