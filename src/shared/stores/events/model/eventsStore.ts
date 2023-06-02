import { makeAutoObservable } from 'mobx'
import { eventApi } from '../api/eventApi';
import { EventType, Speaker, Sponsor } from '../types';
import { EventDataType } from '../types';                                                                
class EventStore {
  events: EventType[] = []

  constructor() {
    makeAutoObservable(this)
  }
  addEvent(event: EventType) {
    this.events.push(event)
  }
  // 
  async getAllEvents(){
    try{
      const response = await eventApi.getAll();
      const events = response.data;
      this.events=events; 
    }
    catch(error){
      console.error('Error:', error)
    }
  } 
  //
  async getEventById(id: string) {
    try {
      const response = await eventApi.getEventById(id);
      const eventData = response.data;
      const event: EventType = {
        id: eventData.id,
        title: eventData.title,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        count_of_visitors: eventData.count_of_visitors,
        description: eventData.description,
        place: eventData.place,
        org_id: eventData.org_id,
        speakers: eventData.speakers,
        sponsors: eventData.sponsors
      };
      const index = this.events.findIndex((event) => event.id === id);
      if (index !== -1) {
        this.events.splice(index, 1, event);
      } else {
        this.events.push(event);
      }
      return event;
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
    }
  }
  // 
  // 
  async createEvent(
    title: string,
    start_date: string,
    end_date: string,
    count_of_visitors: number,
    description: string,
    org_id: string,
    place: {
      title: string;
      longitude: number;
      latitude: number;
    },
    speakers: Speaker,
    sponsors: Sponsor,
  ) {
    try {
      const payload: EventDataType = {
        title,
        start_date,
        end_date,
        count_of_visitors,
        description,
        org_id,
        place,
        speakers,
        sponsors,
      };
      const response = await eventApi.createEvent(payload);
      const newEvent: EventType = {
        title: response.data.title,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
        count_of_visitors: response.data.count_of_visitors,
        description: response.data.description,
        place: response.data.place,
        org_id: response.data.org_id,
        id: '',
        speakers: response.data.speakers,
        sponsors: response.data.sponsors,
      };
      this.addEvent(newEvent);
    } catch (error) {
      console.error('Error creating new event:', error);
    }
  }
  // 
  async updateEventDetails(
    id: string,
    title: string,
    start_date: string,
    end_date: string,
    count_of_visitors: number,
    description: string,
    org_id: string,
    place: {
      title: string;
      longitude: number;
      latitude: number;
    },
    speakers: Speaker,
    sponsors: Sponsor
  ) {
    try {
      const payload: EventType = {
        id,
        title,
        start_date,
        end_date,
        count_of_visitors,
        description,
        org_id,
        place,
        speakers,
        sponsors
      };
      const response = await eventApi.updateEvent(id, payload);
      const updatedEvent: EventType = {
        id: response.data.id,
        title: response.data.title,
        start_date: response.data.start_date,
        end_date: response.data.end_date,
        count_of_visitors: response.data.count_of_visitors,
        description: response.data.description,
        place: response.data.place,
        org_id: response.data.org_id,
        speakers: response.data.speakers,
        sponsors: response.data.sponsors,
      };
      const index = this.events.findIndex((event) => event.id === id);
      if (index !== -1) {
        this.events.splice(index, 1, updatedEvent);
      } else {
        this.events.push(updatedEvent);
      }
      return updatedEvent;
    } catch (error) {
      console.error(`Error updating event with id ${id}:`, error);
    }
  }
  
}
export const eventStore = new EventStore();