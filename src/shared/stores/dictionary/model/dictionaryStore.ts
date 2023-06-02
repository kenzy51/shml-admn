import { makeAutoObservable } from 'mobx';
import { dictionaryApi, DictionaryType } from '../api/dictionaryApi';

class DictionaryStore {
  dictionaries: DictionaryType[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  // 
  async getList() {
    try {
      const response = await dictionaryApi.getList();
      const filteredDictionaries = response.data;
      this.dictionaries = filteredDictionaries;
    } catch (error) {
      console.error('Failed to get Dictionarys', error);
    }
  }
  // 
  async createDictionary(Dictionary: DictionaryType) {
    try {
      const response = await dictionaryApi.createDictionary(Dictionary);
      this.dictionaries.push(response.data);
    } catch (error) {
      console.error('Failed to create Dictionary', error);
    }
  }
  // 

}

export const dictionaryStore = new DictionaryStore();