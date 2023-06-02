import api from 'shared/config/axiosInstance';

export interface Coordinate {
    _id?:string;
    longitude: number;
    latitude: number;
}

export interface Instruction {
    _id?:string;
    picture_url: string;
    description: string;
    sort_order: number;
}

export interface LocationType {
    _id?:string;
    is_deleted?:boolean;
    picture_url: string;
    open_date: string;
    description: string;
    title: string;
    coordinates: Coordinate;
    instruction: Instruction[];
    address:string;
}

export class locationApi {
  static getAll() {
    return api.get('location?skip=0&limit=20&sort=-created_at')
  }
  static getLocationById(id: string) {
    return api.get(`location/${id}`)
  }
  static createLocation(payload: LocationType) {
    return api.post('location/create', payload)
  }
  static deleteLocation(id: string) {
    return api.delete(`location/delete/${id}`)
  }
  static updateLocation(id: string | undefined, payload: LocationType) {
    return api.put(`location/update/${id}`, payload)
  }

}