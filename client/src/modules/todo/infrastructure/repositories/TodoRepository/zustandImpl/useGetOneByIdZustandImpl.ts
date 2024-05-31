import { useMemo } from 'react';
import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { getOneByIdTodosUtil } from '../utils/getOneByIdTodosUtil';
import { useTodoStore } from './todoStore';

export const useGetOneByIdZustandImpl: ITodoRepositoryReactive['useGetOneById'] =
  (todoId: string) => {
    const todo = useTodoStore((state) => state.dict[todoId]);
    return useMemo(() => getOneByIdTodosUtil(todo), [todo]);
  };
