import { createContext, useContext } from 'react';
import { TodoDictionary, TodoRecord } from '../TodoRecord';

export type ITodoContext = {
  saveTodo: (todoRecord: TodoRecord) => void;
  saveAllTodos: (todoRecords: TodoRecord[]) => void;
  deleteTodo: (id: string) => void;
  deleteAllTodos: () => void;
  getAllTodos: () => TodoDictionary;
  getOneById: (id: string) => TodoRecord | undefined;
  allTodos: TodoDictionary;
};

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

export const useTodosContext = () => {
  return useContext(TodoContext);
};
