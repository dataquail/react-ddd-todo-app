import { AppStore, AppDispatch } from 'src/lib/store';
import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { Todo } from 'src/modules/todo/domain/Todo';
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  saveAllTodos,
  updateTodo,
} from './todosReduxConfig';
import { toTodoRecord } from '../utils/toTodoRecord';
import { getAllTodosUtil } from '../utils/getAllTodosUtil';
import { getOneByIdTodosUtil } from '../utils/getOneByIdTodosUtil';

export class TodoRepositoryReduxImpl implements ITodoRepository {
  constructor(
    private readonly appStore: AppStore,
    private readonly appDispatch: AppDispatch,
  ) {}

  public create(todo: Todo): void {
    this.appDispatch(createTodo(toTodoRecord(todo)));
  }

  public update(todo: Todo): void {
    this.appDispatch(updateTodo(toTodoRecord(todo)));
  }

  public updateAll(todoList: Todo[]): void {
    this.appDispatch(saveAllTodos(todoList.map(toTodoRecord)));
  }

  public delete(id: string): void {
    this.appDispatch(deleteTodo(id));
  }

  public deleteAll(): void {
    this.appDispatch(deleteAllTodos());
  }

  public getAll(): Todo[] {
    const todosDictionary = this.appStore.getState().todo.todos.dict;
    return getAllTodosUtil(todosDictionary);
  }

  public getOneById(todoId: string): Todo | undefined {
    const maybeTodoRecord = this.appStore.getState().todo.todos.dict[todoId];
    return getOneByIdTodosUtil(maybeTodoRecord);
  }
}
