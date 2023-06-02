import api from 'shared/config/axiosInstance';
export interface FAQType {
    _id?:any;
   question:string;
   answer:string;
}
export class supportApi {
  static getAll() {
    return api.get('faq/all')
  }
  static createFAQ(payload:FAQType) {
    return api.post('faq/create', payload)
  }
  static deleteFAQ(id:string){
    return api.delete(`faq/${id}`)
  }
  static updateFAQ(id:string, payload:Partial<FAQType>){
    return api.put(`faq/${id}`, payload)
  }
 
}
