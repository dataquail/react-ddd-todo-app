import { create } from 'zustand';
import { TodoDictionary, TodoRecord } from '../TodoRecord';

export type ZustandTodoStore = {
  dict: TodoDictionary;
  saveTodo: (todo: TodoRecord) => void;
  saveAllTodos: (todoDictionary: TodoDictionary) => void;
  deleteTodo: (todoId: string) => void;
  deleteAllTodos: () => void;
};

export const useTodoStore = create<ZustandTodoStore>((set) => ({
  dict: {},
  saveTodo: (todo) =>
    set((state) => ({ dict: { ...state.dict, [todo.id]: todo } })),
  saveAllTodos: (todoDictionary) => set({ dict: todoDictionary }),
  deleteTodo: (todoId) =>
    set((state) => {
      const newDict = { ...state.dict };
      delete newDict[todoId];
      return { dict: newDict };
    }),
  deleteAllTodos: () => set({ dict: {} }),
}));
