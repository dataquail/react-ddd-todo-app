import { Todo } from 'src/modules/todo/domain/Todo';
import { TodoRecord } from '../TodoRecord';

export const toTodoRecord = (todo: Todo): TodoRecord => {
  return {
    id: todo.id,
    title: todo.title,
    created_at: todo.createdAt,
    completed_at: todo.completedAt,
  };
};
