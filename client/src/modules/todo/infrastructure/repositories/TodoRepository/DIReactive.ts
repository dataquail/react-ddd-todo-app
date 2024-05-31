import { ITodoRepositoryReactive } from 'src/modules/todo/domain/repositories/ITodoRepository';
import { useGetAllReduxImpl } from './reduxImpl/useGetAllReduxImpl';
import { useGetOneByIdReduxImpl } from './reduxImpl/useGetOneByIdReduxImpl';
import { useGetAllReactContextImpl } from './reactContextImpl/useGetAllReactContextImpl';
import { useGetOneByIdReactContextImpl } from './reactContextImpl/useGetOneByIdReactContextImpl';
import { useGetAllZustandImpl } from './zustandImpl/useGetAllZustandImpl';
import { useGetOneByIdZustandImpl } from './zustandImpl/useGetOneByIdZustandImpl';

const todoRepositoryReactiveReduxImpl: ITodoRepositoryReactive = {
  useGetAll: useGetAllReduxImpl,
  useGetOneById: useGetOneByIdReduxImpl,
};

const todoRepositoryReactiveReactContextImpl: ITodoRepositoryReactive = {
  useGetAll: useGetAllReactContextImpl,
  useGetOneById: useGetOneByIdReactContextImpl,
};

const todoRepositoryReactiveZustandImpl: ITodoRepositoryReactive = {
  useGetAll: useGetAllZustandImpl,
  useGetOneById: useGetOneByIdZustandImpl,
};

export const redux = todoRepositoryReactiveReduxImpl;
export const reactContext = todoRepositoryReactiveReactContextImpl;
export const zustand = todoRepositoryReactiveZustandImpl;
