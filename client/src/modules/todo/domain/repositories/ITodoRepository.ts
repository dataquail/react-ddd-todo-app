import { Todo } from '../Todo';

export type ITodoRepository = {
  save: (todo: Todo) => void;
  saveAll: (todoList: Todo[]) => void;
  delete: (id: string) => void;
  deleteAll: () => void;
  getAll: () => Todo[];
  getOneById: (id: string) => Todo | undefined;
};

export type ITodoRepositoryReactive = {
  useGetAll: ITodoRepository['getAll'];
  useGetOneById: ITodoRepository['getOneById'];
};
