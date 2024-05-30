import { useMemo } from 'react';
import { MarkTodoAsCompleted } from '.';
import { redux as useReduxTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';
import { reactContext as useReactContextTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';
import { zustand as useZustandTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';

const useMarkTodoAsCompletedReduxImpl = () => {
  const todoRepository = useReduxTodoRepository();

  return useMemo(
    () => new MarkTodoAsCompleted(todoRepository),
    [todoRepository],
  );
};

const useMarkTodoAsCompletedReactContextImpl = () => {
  const todoRepository = useReactContextTodoRepository();

  return useMemo(
    () => new MarkTodoAsCompleted(todoRepository),
    [todoRepository],
  );
};

const useMarkTodoAsCompletedZustandImpl = () => {
  const todoRepository = useZustandTodoRepository();

  return useMemo(
    () => new MarkTodoAsCompleted(todoRepository),
    [todoRepository],
  );
};

export const redux = useMarkTodoAsCompletedReduxImpl;
export const reactContext = useMarkTodoAsCompletedReactContextImpl;
export const zustand = useMarkTodoAsCompletedZustandImpl;
