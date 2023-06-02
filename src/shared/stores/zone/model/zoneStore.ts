import { ZoneType, zoneApi } from '../api/zoneApi';
import { makeAutoObservable } from 'mobx';

export class ZoneStore {
  // 
  zones: ZoneType[] = []
  // 
  constructor() {
    makeAutoObservable(this)
  }
  // 
  addZone(zone: ZoneType) {
    this.zones.push(zone)
  }
  // 
  async getAllZones(){
    try{
      const response = await zoneApi.getAll();
      const filteredZones = response.data.items
        .filter((zone:ZoneType)=> !zone.is_deleted);  
      this.zones = filteredZones;
    }
    catch(error){
      console.error(error)
    }
  }
  //  
  async createZone(payload:ZoneType){
    try{
      const response = await zoneApi.createZone(payload);
      const newZone = response.data;
      this.addZone(newZone)
    }
    catch(error){
      console.error('error',error)
    }
  }
  // 
  async updateZone(_id:string, payload:ZoneType){
    const response = await zoneApi.updateZone(_id, payload);
    this.zones =this.zones.map(zone=> zone._id === _id ? response.data : zone)
  }
  // 

  async deleteZone(_id:string){
    await zoneApi.deleteZone(_id);
    this.zones = this.zones.filter(zone => zone._id !== _id)
  }
  // 

}

export const zoneStore = new ZoneStore();