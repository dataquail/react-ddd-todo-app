import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { Todo } from 'src/modules/todo/domain/Todo';
import { toTodoRecord } from '../utils/toTodoRecord';
import { getAllTodosUtil } from '../utils/getAllTodosUtil';
import { getOneByIdTodosUtil } from '../utils/getOneByIdTodosUtil';
import { ZustandTodoStore } from './todoStore';
import { TodoDictionary } from '../TodoRecord';
import { StoreApi, UseBoundStore } from 'zustand';

export class TodoRepositoryZustandImpl implements ITodoRepository {
  constructor(
    private readonly zustandTodoStore: UseBoundStore<
      StoreApi<ZustandTodoStore>
    >,
  ) {}

  public create(todo: Todo): void {
    this.zustandTodoStore.getState().saveTodo(toTodoRecord(todo));
  }

  public update(todo: Todo): void {
    this.zustandTodoStore.getState().saveTodo(toTodoRecord(todo));
  }

  public updateAll(todoList: Todo[]): void {
    this.zustandTodoStore.getState().saveAllTodos(
      todoList.reduce((acc, todo) => {
        acc[todo.id] = toTodoRecord(todo);
        return acc;
      }, {} as TodoDictionary),
    );
  }

  public delete(id: string): void {
    this.zustandTodoStore.getState().deleteTodo(id);
  }

  public deleteAll(): void {
    this.zustandTodoStore.getState().deleteAllTodos();
  }

  public getAll(): Todo[] {
    const todosDictionary = this.zustandTodoStore.getState().dict;
    return getAllTodosUtil(todosDictionary);
  }

  public getOneById(todoId: string): Todo | undefined {
    const maybeTodoRecord = this.zustandTodoStore.getState().dict[todoId];
    return getOneByIdTodosUtil(maybeTodoRecord);
  }
}
