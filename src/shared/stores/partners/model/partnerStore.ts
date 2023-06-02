import { makeAutoObservable } from 'mobx';
import { PartnerServiceType, PartnerType,partnerApi } from '../api/partnersApi';
import { TagType } from 'shared/stores/tag/api/tagApi';
import { Params } from 'react-router';

class PartnerStore {
  partners: PartnerType[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  // 
  async getAllPartners() {
    try {
      const response = await partnerApi.getAll();
      const partners = response.data.items;
      const filteredPartners = partners.filter((Partner:PartnerType) => !Partner.is_deleted)
      this.partners = filteredPartners
    } catch (error) {
      console.error('Failed to get partners', error);
    }
  }
  // 
  async getPartnerById(id:any){
    try{
      const response = await partnerApi.getPartnerById(id)
      const eachPartner = response.data
      return  eachPartner
    }
    catch(error){
      console.error(error,`error happened with ${error}`)
    }
  }

  async createPartner(Partner: PartnerType) {
    try {
      const response = await partnerApi.createPartner(Partner);
      this.partners.push(response.data);
    } catch (error) {
      console.error('Failed to create Partner', error);
    }
  }
  // 
  async editPartner(partner:PartnerType){
    try{
      const response = await partnerApi.updatePartner(partner._id, partner);
      const editedPartner = response.data;
      const index = this.partners.findIndex(p=> p._id === editedPartner._id);
      if(index !== -1){
        this.partners[index] = editedPartner;
      }
    }
    catch(error){
      console.error('Failed to edt', error)
    }
  } 
  // 
  async deletePartner(_id:string){
    await partnerApi.deletePartner(_id);
    this.partners = this.partners.filter(partner => partner._id !== _id)
  }
  // 
  async assignTag(id: string, tag: TagType) {
    try {
      const response = await partnerApi.assignTagToPartner(id, tag);
      const updatedPartner = response.data;
      const index = this.partners.findIndex(p => p._id === updatedPartner._id);
      if (index !== -1) {
        this.partners[index] = updatedPartner;
      }
    } catch (error) {
      console.error('Failed to assign tag', error);
    }
  }
  // 
  async addServiceToPartner(id: string, payload: PartnerServiceType) {
    try {
      const response = await partnerApi.addServiceToPartner(id, payload);
      const updatedPartner = response.data;
      const index = this.partners.findIndex(p => p._id === updatedPartner._id);
      if (index !== -1) {
        this.partners[index] = updatedPartner;
      }
    } catch (error) {
      console.error('Failed to add service to partner', error);
    }
  }
}

export const partnerStore = new PartnerStore();