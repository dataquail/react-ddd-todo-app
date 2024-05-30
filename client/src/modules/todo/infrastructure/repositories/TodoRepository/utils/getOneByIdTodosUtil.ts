import { TodoRecord } from '../TodoRecord';
import { toTodoDomain } from './toTodoDomain';

export const getOneByIdTodosUtil = (
  maybeTodoRecord: TodoRecord | undefined,
) => {
  if (!maybeTodoRecord) {
    return undefined;
  }
  return toTodoDomain(maybeTodoRecord);
};
