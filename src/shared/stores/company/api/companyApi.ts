import api from 'shared/config/axiosInstance';

export interface CompanyDataType {
  name: string;
}

export class companyApi {
  static getAll() {
    return api.get('organization');
  }
  static createCompany(payload: CompanyDataType) {
    return api.post('organization', payload);
  }
  static updateCompany(companyId: string, payload: CompanyDataType) {
    return api.put(`organization/${companyId}`, payload);
  }
  static deleteCompany(companyId: string, { is_deleted }: any) {
    return api.delete(`organization/${companyId}`, { data: { is_deleted } });
  }
  static getCompanyById(id:string | undefined){
    return api.get(`organization/${id}`)
  }
}
