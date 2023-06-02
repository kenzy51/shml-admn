import { Speaker, speakerApi } from '../api/speakerApi';
import { makeAutoObservable } from 'mobx';

export class SpeakerStore{
  speakers: Speaker[] =[];

  constructor(){
    makeAutoObservable(this)
  }
  addSpeaker(speaker:Speaker){
    this.speakers.push(speaker)
  }

  async createSpeaker(eventId:any, speakerData:Speaker){
    try{
      const response = await speakerApi.createSpeaker(eventId, speakerData);
      const speaker: Speaker ={
        full_name: response.data.full_name,
        description: response.data.description,
        is_main_scene:response.data.is_main_scene,
        picture: response.data.picture,
      }
      this.addSpeaker(speaker);
      return speaker;
    }
    catch(error){
      console.error('errrer', error)
    }
  }

  async getAllSpeakers(eventId:string){
    try{
      const response = await speakerApi.getAll(eventId);
      const speakersArray = response.data.items
      this.speakers = speakersArray;
      return speakersArray;
    }
    catch(error){
      console.error('error', error)
    }
  }
  clearSpeakers(){
    this.speakers = [];
  }
}

export const speakerStore = new SpeakerStore();