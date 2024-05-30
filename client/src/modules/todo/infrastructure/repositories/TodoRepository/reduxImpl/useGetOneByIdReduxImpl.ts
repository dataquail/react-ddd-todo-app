import { useMemo } from 'react';
import { useAppSelector } from 'src/lib/store';
import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { getOneByIdTodosUtil } from '../utils/getOneByIdTodosUtil';

export const useGetOneByIdReduxImpl: ITodoRepositoryReactive['useGetOneById'] =
  (todoId: string) => {
    const todo = useAppSelector((state) => state.todo.todos.dict[todoId]);
    return useMemo(() => getOneByIdTodosUtil(todo), [todo]);
  };
