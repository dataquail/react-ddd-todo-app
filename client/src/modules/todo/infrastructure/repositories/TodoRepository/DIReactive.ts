import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useGetAllReduxImpl } from './reduxImpl/useGetAllReduxImpl';
import { useGetOneByIdReduxImpl } from './reduxImpl/useGetOneByIdReduxImpl';
import { useGetAllReactContextImpl } from './reactContextImpl/useGetAllReactContextImpl';
import { useGetOneByIdReactContextImpl } from './reactContextImpl/useGetOneByIdReactContextImpl';
import { useGetAllZustandImpl } from './zustandImpl/useGetAllZustandImpl';
import { useGetOneByIdZustandImpl } from './zustandImpl/useGetOneByIdZustandImpl';

const useTodoRepositoryReactiveReduxImpl = (): ITodoRepositoryReactive => {
  return {
    useGetAll: useGetAllReduxImpl,
    useGetOneById: useGetOneByIdReduxImpl,
  };
};

const useTodoRepositoryReactiveReactContextImpl =
  (): ITodoRepositoryReactive => {
    return {
      useGetAll: useGetAllReactContextImpl,
      useGetOneById: useGetOneByIdReactContextImpl,
    };
  };

const useTodoRepositoryReactiveZustandImpl = (): ITodoRepositoryReactive => {
  return {
    useGetAll: useGetAllZustandImpl,
    useGetOneById: useGetOneByIdZustandImpl,
  };
};

export const redux = useTodoRepositoryReactiveReduxImpl;
export const reactContext = useTodoRepositoryReactiveReactContextImpl;
export const zustand = useTodoRepositoryReactiveZustandImpl;
