import api from 'shared/config/axiosInstance';
import {TodoItem} from '../model/TestStore';
import {AxiosResponse} from 'axios';

export class TestApi {

  static getTodos (): Promise<AxiosResponse<TodoItem[]>> {
    return api.get('/todos');
  }

}