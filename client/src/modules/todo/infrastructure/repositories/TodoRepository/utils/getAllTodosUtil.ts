import { TodoDictionary } from '../TodoRecord';
import { toTodoDomain } from './toTodoDomain';

export const getAllTodosUtil = (todoDictionary: TodoDictionary) => {
  return Object.keys(todoDictionary)
    .map((todoId) => {
      const maybeTodoRecord = todoDictionary[todoId];
      if (!maybeTodoRecord) {
        throw new Error('Unexpected undefined todo record');
      }
      return toTodoDomain(maybeTodoRecord);
    })
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};
