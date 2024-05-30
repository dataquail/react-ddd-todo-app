import { Paper } from '@mantine/core';
import 'src/App.css';
import { DependencySelector } from 'src/components/DependencySelector';
import { TodoList } from 'src/components/TodoList';
import { AddNewTodoForm } from 'src/components/AddNewTodoForm';
import { redux as useTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';
import { redux as useTodoRepositoryReactive } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DIReactive';
import { redux as useMarkTodoAsCompleted } from 'src/modules/todo/domain/application/MarkTodoAsCompleted/DI';
import { redux as useMarkCompletedTodoAsNotComplete } from 'src/modules/todo/domain/application/MarkCompletedTodoAsNotCompleted/DI';

export const TodoRedux = () => {
  const todoRepository = useTodoRepository();
  const todoList = useTodoRepositoryReactive().useGetAll();
  const markTodoAsCompleted = useMarkTodoAsCompleted();
  const markCompletedTodoAsNotComplete = useMarkCompletedTodoAsNotComplete();

  return (
    <Paper>
      <DependencySelector />
      <AddNewTodoForm todoRepository={todoRepository} />
      <TodoList
        todoList={todoList}
        markTodoAsCompleted={markTodoAsCompleted}
        markCompletedTodoAsNotComplete={markCompletedTodoAsNotComplete}
      />
    </Paper>
  );
};
