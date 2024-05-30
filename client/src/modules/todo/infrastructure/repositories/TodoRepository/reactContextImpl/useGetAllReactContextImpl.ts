import { useMemo } from 'react';
import { getAllTodosUtil } from '../utils/getAllTodosUtil';
import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useTodosContext } from './todosReactContextConfig';

export const useGetAllReactContextImpl: ITodoRepositoryReactive['useGetAll'] =
  () => {
    const { allTodos } = useTodosContext();
    return useMemo(() => getAllTodosUtil(allTodos), [allTodos]);
  };
