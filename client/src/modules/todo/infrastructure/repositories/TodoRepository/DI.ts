import { useMemo } from 'react';
import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useTodosContext } from './reactContextImpl/todosReactContextConfig';
import { TodoRepositoryReactContextImpl } from './reactContextImpl/TodoRepositoryReactContextImpl';
import { useAppDispatch, useAppStore } from 'src/lib/store';
import { TodoRepositoryReduxImpl } from './reduxImpl/TodoRepositoryReduxImpl';
import { TodoRepositoryZustandImpl } from './zustandImpl/TodoRepositoryZustandImpl';
import { useTodoStore } from './zustandImpl/todoStore';

const useTodoRepositoryReduxImpl = (): ITodoRepository => {
  const appStore = useAppStore();
  const appDispatch = useAppDispatch();

  return useMemo(
    () => new TodoRepositoryReduxImpl(appStore, appDispatch),
    [appStore, appDispatch],
  );
};

const useTodoRepositoryReactContextImpl = (): ITodoRepository => {
  const todosContext = useTodosContext();

  return useMemo(
    () => new TodoRepositoryReactContextImpl(todosContext),
    [todosContext],
  );
};

const todoRepositoryZustandImpl = new TodoRepositoryZustandImpl(useTodoStore);

const useTodoRepositoryZustandImpl = (): ITodoRepository => {
  return todoRepositoryZustandImpl;
};

export const redux = useTodoRepositoryReduxImpl;
export const reactContext = useTodoRepositoryReactContextImpl;
export const zustand = useTodoRepositoryZustandImpl;
