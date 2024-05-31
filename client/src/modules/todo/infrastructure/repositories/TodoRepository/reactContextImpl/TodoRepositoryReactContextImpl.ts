import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { Todo } from 'src/modules/todo/domain/Todo';
import { toTodoRecord } from '../utils/toTodoRecord';
import { getAllTodosUtil } from '../utils/getAllTodosUtil';
import { getOneByIdTodosUtil } from '../utils/getOneByIdTodosUtil';
import { ITodoContext } from './todosReactContextConfig';

export class TodoRepositoryReactContextImpl implements ITodoRepository {
  constructor(private readonly todosContext: ITodoContext) {}

  save(todo: Todo): void {
    this.todosContext.saveTodo(toTodoRecord(todo));
  }

  saveAll(todoList: Todo[]): void {
    this.todosContext.saveAllTodos(todoList.map(toTodoRecord));
  }

  delete(id: string): void {
    this.todosContext.deleteTodo(id);
  }

  deleteAll(): void {
    this.todosContext.deleteAllTodos();
  }

  getAll(): Todo[] {
    const todosDictionary = this.todosContext.getAllTodos();
    return getAllTodosUtil(todosDictionary);
  }

  getOneById(todoId: string): Todo | undefined {
    const maybeTodoRecord = this.todosContext.getOneById(todoId);
    return getOneByIdTodosUtil(maybeTodoRecord);
  }
}
