export interface Picture {
  url: string;
  title: string;
}

export interface Contacts {
  instagram: string;
  email: string;
  phone: string;
}

export interface Speaker {
  full_name: string;
  description: string;
  picture: Picture;
  contacts: Contacts;
  org_id: string;
  _id?:any; 
}

export interface Sponsor {
  full_name: string;
  description: string;
  picture: Picture;
  contacts: Contacts;
  org_id: string;
}

export interface EventType {
    id?: string;
    title: string;
    start_date: string;
    end_date: string;
    count_of_visitors: number;
    description: string;
    org_id:string;
    place: {
      title: string;
      longitude: number;
      latitude: number;
    }
    speakers: Speaker;
    sponsors: Sponsor;
  }


export interface EventDataType {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    count_of_visitors: number;
    place: {
      title: string;
      longitude: number;
      latitude: number;
    }
    org_id: string;
    speakers: Speaker;
    sponsors: Sponsor;
    
  }

export interface OneEvent {
    event:EventDataType
  }