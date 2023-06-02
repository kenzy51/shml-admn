import {makeAutoObservable} from 'mobx'
import { companionApi,CompanionType, CompanionTypeInterface } from '../api/companionApi'

export class CompanionStore {
  companions :CompanionType[] = [];
  companionTypes: CompanionTypeInterface[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getAllCompanions() {
    try {
      const response = await companionApi.getAll();
      this.companions = response.data.items;
    } catch (error) {
      console.error(error)
    }
  }

  async createCompanion(payload: CompanionType) {
    try {
      const response = await companionApi.createCompanion(payload);
      const newCompanion= response.data;
      this.companions.push(newCompanion);
    } catch (error) {
      console.error(error)
    }
  }

  async deleteCompanion(id: string) {
    try {
      await companionApi.deleteCompanion(id);
      this.companions = this.companions.filter(companion => companion._id !== id);
    } catch (error) {
      console.error(error)
    }
  }
  // 
  async updateCompanion(id: string, payload: CompanionType) {
    try {
      const response = await companionApi.updateCompanion(id, payload);
      const updatedCompanion = response.data;
      const companionIndex = this.companions.findIndex(companion => companion._id === updatedCompanion._id);
      if (companionIndex >= 0) {
        this.companions[companionIndex] = updatedCompanion;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //  Companion types
  async getCompanionTypes() {
    try {
      const response = await companionApi.getCompanionType();
      this.companionTypes = response.data.items;
    } catch (error) {
      console.error(error);
    }
  }
  // 
  async createCompanionType(payload: CompanionTypeInterface) {
    try {
      await companionApi.createCompanionType(payload);
    } catch (error) {
      console.error(error);
    }
  }
  // 
  async deleteCompanionType(id: string) {
    try {
      await companionApi.deleteCompanionType(id);
      this.companionTypes = this.companionTypes.filter(companionType => companionType._id !== id);
    } catch (error) {
      console.error(error)
    }
  }

  async updateCompanionType(id: string, payload: CompanionTypeInterface) {
    try {
      const response = await companionApi.updateCompanionType(id, payload);
      const updatedCompanion = response.data;
      const companionIndex = this.companionTypes.findIndex(companionType => companionType._id === updatedCompanion._id);
      if (companionIndex >= 0) {
        this.companionTypes[companionIndex] = updatedCompanion;
      }
    } catch (error) {
      console.error(error);
    }
  }

}

export const companionStore = new CompanionStore(); 