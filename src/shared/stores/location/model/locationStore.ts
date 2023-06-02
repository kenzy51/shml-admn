import {makeAutoObservable} from 'mobx'
import { LocationType, locationApi } from '../api/locationApi';

export class LocationStore{
  locations: LocationType[]=[]
  constructor(){
    makeAutoObservable(this);
  }
  addlocation(location:LocationType){
    this.locations.push(location)
  }

  async createLocation(location: LocationType) {
    try {
      const response = await locationApi.createLocation(location)
      this.locations.push(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  async getAlllocations() {
    try {
      const response = await locationApi.getAll()
      const filteredlocations = response.data.filter((location:LocationType)=> !location.is_deleted)
      this.locations = filteredlocations
    } catch (error) {
      console.error(error)
    }
  } 


  async deletelocation(_id:string){
    await locationApi.deleteLocation(_id);
    this.locations = this.locations.filter(location => location._id !== _id)
  }
    
  async updatelocation(_id:string, location:LocationType){
    try{
      const response = await locationApi.updateLocation(location._id, location);
      const updatedlocation = response.data;
      const index = this.locations.findIndex(t => t._id === updatedlocation);
      if(index !== -1){
        this.locations[index] = updatedlocation
      }
    }
    catch(error){
      console.error(error,'error')
    }
  }
}

export const locationStore = new LocationStore();




