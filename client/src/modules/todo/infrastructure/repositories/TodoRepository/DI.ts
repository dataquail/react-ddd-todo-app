import { useMemo } from 'react';
import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useTodosContext } from './reactContextImpl/todosReactContextConfig';
import { TodoRepositoryReactContextImpl } from './reactContextImpl/TodoRepositoryReactContextImpl';
import { useAppDispatch, useAppStore } from 'src/lib/store';
import { TodoRepositoryReduxImpl } from './reduxImpl/TodoRepositoryReduxImpl';

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

export const redux = useTodoRepositoryReduxImpl;
export const reactContext = useTodoRepositoryReactContextImpl;
