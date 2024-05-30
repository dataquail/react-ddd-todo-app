import { useMemo } from 'react';
import { MarkCompletedTodoAsNotCompleted } from '.';
import { redux as useReduxTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';
import { reactContext as useReactContextTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';
import { zustand as useZustandTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';

const useMarkCompletedTodoAsNotCompleteReduxImpl = () => {
  const todoRepository = useReduxTodoRepository();

  return useMemo(
    () => new MarkCompletedTodoAsNotCompleted(todoRepository),
    [todoRepository],
  );
};

const useMarkCompletedTodoAsNotCompleteReactContextImpl = () => {
  const todoRepository = useReactContextTodoRepository();

  return useMemo(
    () => new MarkCompletedTodoAsNotCompleted(todoRepository),
    [todoRepository],
  );
};

const useMarkCompletedTodoAsNotCompleteZustandImpl = () => {
  const todoRepository = useZustandTodoRepository();

  return useMemo(
    () => new MarkCompletedTodoAsNotCompleted(todoRepository),
    [todoRepository],
  );
};

export const redux = useMarkCompletedTodoAsNotCompleteReduxImpl;
export const reactContext = useMarkCompletedTodoAsNotCompleteReactContextImpl;
export const zustand = useMarkCompletedTodoAsNotCompleteZustandImpl;
