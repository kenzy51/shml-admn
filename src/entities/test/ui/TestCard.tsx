import {observer} from 'mobx-react-lite';
import {todoStore} from '../model/TestStore';

interface TodoCardProps {
    className?: string;
}

export const TestCard = observer(({ className }: TodoCardProps) => {
  const { getAllTodos, todos } = todoStore;

  return (
    <div>
      <div>
        <button onClick={getAllTodos}>GetAllTodos</button>
        <div>
          {todos.map(({ title }) => title)}
        </div>
      </div>
    </div>
  );
});
