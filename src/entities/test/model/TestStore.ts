import {makeAutoObservable} from 'mobx';
import {TestApi} from '../api/TestApi';
import {fetchAction} from '../../../shared/lib/axiosWrapper/axiosWrapper';
export interface TodoItem {
  userId: string,
  id: number,
  title: string,
  completed: boolean
}
class TestStore {
  public todos: TodoItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllTodos = async () => {
    const res = await fetchAction(TestApi.getTodos(), { show: true });
    this.todos = res.data;
  }
}

export const todoStore = new TestStore();