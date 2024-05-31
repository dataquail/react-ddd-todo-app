import { useMemo } from 'react';
import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useTodoStore } from './todoStore';
import { getAllTodosUtil } from '../utils/getAllTodosUtil';

export const useGetAllZustandImpl: ITodoRepositoryReactive['useGetAll'] =
  () => {
    const todoDictionary = useTodoStore((state) => state.dict);
    return useMemo(() => getAllTodosUtil(todoDictionary), [todoDictionary]);
  };
