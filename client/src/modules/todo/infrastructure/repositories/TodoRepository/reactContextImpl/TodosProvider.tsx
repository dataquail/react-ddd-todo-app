import { ReactNode, useState, useCallback, useRef } from 'react';
import { TodoDictionary, TodoRecord } from '../TodoRecord';
import { TodoContext } from './todosReactContextConfig';

type TodoProps = {
  children: ReactNode;
};

export const TodosProvider = ({ children }: TodoProps) => {
  const [todosDictionary, setTodosDictionary] = useState<TodoDictionary>({});
  const todosDictionaryRef = useRef<TodoDictionary>();

  if (todosDictionaryRef.current !== todosDictionary) {
    todosDictionaryRef.current = todosDictionary;
  }

  return (
    <TodoContext.Provider
      value={{
        saveTodo: useCallback(
          (todoRecord: TodoRecord) => {
            const newTodoDictionary = {
              ...todosDictionaryRef.current,
              [todoRecord.id]: todoRecord,
            };
            setTodosDictionary(newTodoDictionary);
            todosDictionaryRef.current = newTodoDictionary;
          },
          [setTodosDictionary],
        ),
        saveAllTodos: useCallback(
          (todoRecords: TodoRecord[]) => {
            const newDictToSave = todoRecords.reduce((acc, todo) => {
              acc[todo.id] = todo;
              return acc;
            }, {} as TodoDictionary);
            setTodosDictionary(newDictToSave);
            todosDictionaryRef.current = newDictToSave;
          },
          [setTodosDictionary],
        ),
        deleteTodo: useCallback(
          (id: string) => {
            const newDict = { ...todosDictionaryRef.current };
            delete newDict[id];
            setTodosDictionary(newDict);
            todosDictionaryRef.current = newDict;
          },
          [setTodosDictionary],
        ),
        deleteAllTodos: useCallback(() => {
          setTodosDictionary({});
          todosDictionaryRef.current = {};
        }, [setTodosDictionary]),
        getAllTodos: useCallback(() => todosDictionaryRef.current || {}, []),
        getOneById: useCallback(
          (id: string) => todosDictionaryRef.current?.[id],
          [],
        ),
        allTodos: todosDictionary,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
