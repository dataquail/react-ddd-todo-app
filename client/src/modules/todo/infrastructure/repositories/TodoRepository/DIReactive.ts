import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useGetAllReduxImpl } from './reduxImpl/useGetAllReduxImpl';
import { useGetOneByIdReduxImpl } from './reduxImpl/useGetOneByIdReduxImpl';
import { useGetAllReactContextImpl } from './reactContextImpl/useGetAllReactContextImpl';
import { useGetOneByIdReactContextImpl } from './reactContextImpl/useGetOneByIdReactContextImpl';

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

export const redux = useTodoRepositoryReactiveReduxImpl;
export const reactContext = useTodoRepositoryReactiveReactContextImpl;
