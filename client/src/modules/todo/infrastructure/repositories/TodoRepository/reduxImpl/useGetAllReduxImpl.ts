import { useMemo } from 'react';
import { getAllTodosUtil } from '../utils/getAllTodosUtil';
import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useAppSelector } from 'src/lib/store';

export const useGetAllReduxImpl: ITodoRepositoryReactive['useGetAll'] = () => {
  const todoDictionary = useAppSelector((state) => state.todo.todos.dict);
  return useMemo(() => getAllTodosUtil(todoDictionary), [todoDictionary]);
};
