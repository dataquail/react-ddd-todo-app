import { useMemo } from 'react';
import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { getOneByIdTodosUtil } from '../utils/getOneByIdTodosUtil';
import { useTodosContext } from './todosReactContextConfig';

export const useGetOneByIdReactContextImpl: ITodoRepositoryReactive['useGetOneById'] =
  (todoId: string) => {
    const { allTodos } = useTodosContext();
    return useMemo(
      () => getOneByIdTodosUtil(allTodos[todoId]),
      [todoId, allTodos],
    );
  };
