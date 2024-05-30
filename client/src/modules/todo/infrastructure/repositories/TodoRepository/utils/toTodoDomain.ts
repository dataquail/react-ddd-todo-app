import { Todo } from 'src/modules/todo/domain/Todo';
import { TodoRecord } from '../TodoRecord';

export const toTodoDomain = (todoRecord: TodoRecord): Todo => {
  return new Todo(
    todoRecord.id,
    todoRecord.title,
    todoRecord.created_at,
    todoRecord.completed_at,
  );
};
