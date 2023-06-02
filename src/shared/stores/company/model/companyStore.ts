import { notification } from 'antd';
import { makeAutoObservable } from 'mobx';
import { Params } from 'react-router';
import { companyApi, CompanyDataType } from '../api/companyApi';

export interface CompanyType {
  is_deleted?: boolean | any;
  _id: string;
  name: string;
}

export class CompanyStore {
  companies: CompanyType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addCompany(company: CompanyType) {
    this.companies.push(company);
  }

  removeCompany(id: string) {
    this.companies = this.companies.filter((company) => company._id !== id);
  }

  async createCompany(name: string) {
    try {
      const payload: CompanyDataType = { name };
      const response = await companyApi.createCompany(payload);
      const newCompany: CompanyType = {
        _id: response.data._id,
        name: response.data.name,
      };
      this.addCompany(newCompany);
    } catch (error) {
      console.error('Error creating new company:', error);
    }
  }

  async updateCompany(company: CompanyType, newName: string) {
    try {
      await companyApi.updateCompany(company._id, { name: newName });
      const updatedCompany: CompanyType = { ...company, name: newName };
      const index = this.companies.findIndex((c) => c._id === company._id);
      if (index !== -1) {
        this.companies[index] = updatedCompany;
      }
      notification.success({
        message: `${company.name} was succesfully updated`,
      });
    } catch (error) {
      console.error('Error updating company:', error);
    }
  }

  async getCompanies() {
    try {
      const response = await companyApi.getAll();
      const loadedCompanies: CompanyType[] = response.data.items
        .filter((company:    CompanyType      ) => !company.is_deleted)
        .map((company:       CompanyType      ) => ({
          _id: company._id,
          name: company.name,
        }));
      this.companies = loadedCompanies;
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  }
  async getCompanyById(id: string | undefined) {
    try {
      const response = await companyApi.getCompanyById(id);
      const loadedCompany: CompanyType = {
        _id: response.data._id,
        name: response.data.name,
      };
      return loadedCompany;
    } catch (error) {
      console.error(`Error loading company with id ${id}:`, error);
    }
  }
}

export const companyStore = new CompanyStore();