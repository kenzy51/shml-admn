import { makeAutoObservable } from 'mobx';
import { FAQType, supportApi } from '../api/supportApi';

class SupportStore {
  faqs: FAQType[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  // 
  async fetchFAQs() {
    const response = await supportApi.getAll();
    this.faqs = response.data.items;
  }
  // 
  async createFAQ(payload: FAQType) {
    const response = await supportApi.createFAQ(payload);
    const newFAQ = response.data
    this.faqs.push(newFAQ);
  }
  // 
  async deleteFAQ(_id: string) {
    await supportApi.deleteFAQ(_id);
    this.faqs = this.faqs.filter(faq => faq._id !== _id);
  }
  // 
  async updateFAQ(_id: string, payload: Partial<FAQType>) {
    const response = await supportApi.updateFAQ(_id, payload);
    this.faqs = this.faqs.map(faq => faq._id === _id ? response.data : faq);
  }
}

export const supportStore = new SupportStore();
