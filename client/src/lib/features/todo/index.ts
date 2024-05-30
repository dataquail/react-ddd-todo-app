import { combineReducers } from '@reduxjs/toolkit';
import { todosReducer } from 'src/modules/todo/infrastructure/repositories/TodoRepository/reduxImpl/todosReduxConfig';

export const todoReducer = combineReducers({
  todos: todosReducer,
});
