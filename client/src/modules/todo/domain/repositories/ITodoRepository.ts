import { Todo } from '../Todo';

export type ITodoRepository = {
  create: (todo: Todo) => void;
  update: (todo: Todo) => void;
  updateAll: (todoList: Todo[]) => void;
  delete: (id: string) => void;
  deleteAll: () => void;
  getAll: () => Todo[];
  getOneById: (id: string) => Todo | undefined;
};

export type ITodoRepositoryReactive = {
  useGetAll: ITodoRepository['getAll'];
  useGetOneById: ITodoRepository['getOneById'];
};
