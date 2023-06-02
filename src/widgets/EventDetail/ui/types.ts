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
}

export interface Sponsor {
  full_name: string;
  description: string;
  picture: Picture;
  contacts: Contacts;
  org_id: string;
}
export interface Event {
  _id?:string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  org_id: string;
  speakers?: Speaker | Speaker[];
  // sponsors: Sponsor | Sponsor[];
}