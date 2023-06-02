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
  _id?:any;
  full_name: string;
  description: string;
  is_main_scene:boolean;
  picture: Picture;
}

export interface Sponsor {
  full_name: string;
  description: string;
  picture: Picture;
  contacts: Contacts;
  org_id: string;
}

export interface EventData {
    _id?:string;
    place_title: string;
    longitude: number;
    latitude: number;
    title:string;
    description: string;
    start_date:string;
    end_date:string;
    org_id:string;
    count_of_visitors:number;
    place: {
        title: string,
        longitude: number,
        latitude: number
      },
    speakers: Speaker[];
    sponsors: Sponsor[];
    is_deleted?:boolean;
}