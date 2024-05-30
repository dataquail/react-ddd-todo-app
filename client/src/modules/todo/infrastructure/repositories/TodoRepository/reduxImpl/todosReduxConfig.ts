import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TodoRecord, TodoDictionary } from '../TodoRecord';

const initialState = {
  dict: {} as TodoDictionary,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<TodoRecord>) => {
      state.dict = {
        ...state.dict,
        [action.payload.id]: action.payload,
      };
    },
    updateTodo: (state, action: PayloadAction<TodoRecord>) => {
      state.dict[action.payload.id] = action.payload;
    },
    saveAllTodos: (state, action: PayloadAction<TodoRecord[]>) => {
      const newDictToSave = action.payload.reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {} as TodoDictionary);
      state.dict = newDictToSave;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      delete state.dict[action.payload];
    },
    deleteAllTodos: (state) => {
      state.dict = {};
    },
  },
});

export const {
  createTodo,
  updateTodo,
  saveAllTodos,
  deleteTodo,
  deleteAllTodos,
} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
