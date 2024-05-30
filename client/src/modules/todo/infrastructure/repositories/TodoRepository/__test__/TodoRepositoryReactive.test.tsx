import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { Todo } from 'src/modules/todo/domain/Todo';
import { getReduxWrapper } from 'src/__test__/getReduxWrapper';
import { getTodosProviderWrapper } from 'src/__test__/getTodosProviderWrapper';
import {
  redux as useReduxTodoRepository,
  reactContext as useReactContextTodoRepository,
  zustand as useZustandTodoRepository,
} from '../DI';
import {
  redux as useReduxTodoRepositoryReactive,
  reactContext as useReactContextTodoRepositoryReactive,
  zustand as useZustandTodoRepositoryReactive,
} from '../DIReactive';
import { useTodoStore } from '../zustandImpl/todoStore';

type ChildrenProps = {
  children: ReactNode;
};

describe('TodoRepositoryReactive', () => {
  const implementations = [
    // all implementations listed here
    'redux',
    'reactContext',
    'zustand',
  ] as const;

  describe('getAll()', () => {
    beforeEach(() => {
      // Since zustand is a global singleton, we need to reset the state before each test
      useTodoStore.setState(useTodoStore.getInitialState());
    });

    const getReduxTestHarness = () => {
      const { ReduxWrapper } = getReduxWrapper();
      const useTestHook = () => {
        const todoRepository = useReduxTodoRepository();
        return {
          todoRepository,
          useGetAll: useReduxTodoRepositoryReactive().useGetAll(),
        };
      };
      return renderHook(useTestHook, {
        wrapper: ({ children }: ChildrenProps) => (
          <ReduxWrapper>{children}</ReduxWrapper>
        ),
      });
    };

    const getReactContextTestHarness = () => {
      const { TodosProviderWrapper } = getTodosProviderWrapper();
      const useTestHook = () => {
        const todoRepository = useReactContextTodoRepository();
        return {
          todoRepository,
          useGetAll: useReactContextTodoRepositoryReactive().useGetAll(),
        };
      };
      return renderHook(useTestHook, {
        wrapper: ({ children }: ChildrenProps) => (
          <TodosProviderWrapper>{children}</TodosProviderWrapper>
        ),
      });
    };

    const getZustandTestHarness = () => {
      const useTestHook = () => {
        const todoRepository = useZustandTodoRepository();
        return {
          todoRepository,
          useGetAll: useZustandTodoRepositoryReactive().useGetAll(),
        };
      };
      return renderHook(useTestHook);
    };

    const getTestHarness = (
      implementation: 'redux' | 'reactContext' | 'zustand',
    ) => {
      if (implementation === 'redux') {
        return getReduxTestHarness();
      } else if (implementation === 'zustand') {
        return getZustandTestHarness();
      } else {
        return getReactContextTestHarness();
      }
    };

    it.each(implementations)(
      'Impl: %s useGetAll() is initially empty',
      (implementation) => {
        const { result } = getTestHarness(implementation);

        expect(result.current.useGetAll).toEqual([]);
      },
    );

    it.each(implementations)(
      'Impl: %s create() adds a new todo to useGetAll()',
      async (implementation) => {
        const { result } = getTestHarness(implementation);

        const todo = Todo.create('test todo');

        act(() => {
          result.current.todoRepository.create(todo);
        });

        expect(result.current.useGetAll[0]).toEqual(todo);
      },
    );

    it.each(implementations)(
      'Impl: %s delete() removes a todo from useGetAll()',
      (implementation) => {
        const { result } = getTestHarness(implementation);

        const todo = Todo.create('test todo');

        act(() => {
          result.current.todoRepository.create(todo);
        });

        expect(result.current.useGetAll[0]).toEqual(todo);

        act(() => {
          result.current.todoRepository.delete(todo.id);
        });

        expect(result.current.useGetAll[0]).toBeUndefined();
      },
    );

    it.each(implementations)(
      'Impl: %s deleteAll() removes all todos from useGetAll()',
      (implementation) => {
        const { result } = getTestHarness(implementation);

        const todo1 = Todo.create('todo 1');
        const todo2 = Todo.create('todo 2');

        act(() => {
          result.current.todoRepository.create(todo1);
          result.current.todoRepository.create(todo2);
        });

        expect(result.current.useGetAll[0]).toEqual(todo1);
        expect(result.current.useGetAll[1]).toEqual(todo2);

        act(() => {
          result.current.todoRepository.deleteAll();
        });

        expect(result.current.useGetAll).toEqual([]);
      },
    );

    it.each(implementations)(
      'Impl: %s update() updates a todo in useGetAll()',
      (implementation) => {
        const { result } = getTestHarness(implementation);

        const todo = Todo.create('todo 1');

        act(() => {
          result.current.todoRepository.create(todo);
        });

        expect(result.current.useGetAll[0]?.completedAt).toBeUndefined();

        act(() => {
          result.current.todoRepository.update(todo.complete());
        });

        expect(result.current.useGetAll[0]?.completedAt).not.toBeUndefined();
      },
    );
  });

  describe('getOneById()', () => {
    beforeEach(() => {
      useTodoStore.setState(useTodoStore.getInitialState());
    });

    const getReduxTestHarness = (todoId: string) => {
      const { ReduxWrapper } = getReduxWrapper();
      const useTestHook = () => {
        const todoRepository = useReduxTodoRepository();
        return {
          todoRepository,
          useGetOneById: useReduxTodoRepositoryReactive().useGetOneById(todoId),
        };
      };
      return renderHook(useTestHook, {
        wrapper: ({ children }: ChildrenProps) => (
          <ReduxWrapper>{children}</ReduxWrapper>
        ),
      });
    };

    const getReactContextTestHarness = (todoId: string) => {
      const { TodosProviderWrapper } = getTodosProviderWrapper();
      const useTestHook = () => {
        const todoRepository = useReactContextTodoRepository();
        return {
          todoRepository,
          useGetOneById:
            useReactContextTodoRepositoryReactive().useGetOneById(todoId),
        };
      };
      return renderHook(useTestHook, {
        wrapper: ({ children }: ChildrenProps) => (
          <TodosProviderWrapper>{children}</TodosProviderWrapper>
        ),
      });
    };

    const getZustandTestHarness = (todoId: string) => {
      const useTestHook = () => {
        const todoRepository = useZustandTodoRepository();
        return {
          todoRepository,
          useGetOneById:
            useZustandTodoRepositoryReactive().useGetOneById(todoId),
        };
      };
      return renderHook(useTestHook);
    };

    const getTestHarness = (
      implementation: 'redux' | 'reactContext' | 'zustand',
      todoId: string,
    ) => {
      if (implementation === 'redux') {
        return getReduxTestHarness(todoId);
      } else if (implementation === 'zustand') {
        return getZustandTestHarness(todoId);
      } else {
        return getReactContextTestHarness(todoId);
      }
    };

    it.each(implementations)(
      'Impl: %s useGetOneById() is initially undefined',
      (implementation) => {
        const todo = Todo.create('todo 1');
        const { result } = getTestHarness(implementation, todo.id);
        expect(result.current.useGetOneById).toBeUndefined();
      },
    );

    it.each(implementations)(
      'Impl: %s create() adds a new todo to useGetOneById()',
      async (implementation) => {
        const todo = Todo.create('todo 1');
        const { result } = getTestHarness(implementation, todo.id);
        act(() => {
          result.current.todoRepository.create(todo);
        });
        expect(result.current.useGetOneById).toEqual(todo);
      },
    );

    it.each(implementations)(
      'Impl: %s delete() removes a todo from useGetOneById()',
      (implementation) => {
        const todo = Todo.create('todo 1');
        const { result } = getTestHarness(implementation, todo.id);
        act(() => {
          result.current.todoRepository.create(todo);
        });
        expect(result.current.useGetOneById).toEqual(todo);
        act(() => {
          result.current.todoRepository.delete(todo.id);
        });
        expect(result.current.useGetOneById).toBeUndefined();
      },
    );

    it.each(implementations)(
      'Impl: %s deleteAll() removes all todos from useGetOneById()',
      (implementation) => {
        const todo1 = Todo.create('todo 1');
        const todo2 = Todo.create('todo 2');
        const { result } = getTestHarness(implementation, todo1.id);
        act(() => {
          result.current.todoRepository.create(todo1);
          result.current.todoRepository.create(todo2);
        });
        expect(result.current.useGetOneById).toEqual(todo1);
        act(() => {
          result.current.todoRepository.deleteAll();
        });
        expect(result.current.useGetOneById).toBeUndefined();
      },
    );

    it.each(implementations)(
      'Impl: %s update() updates a todo in useGetOneById()',
      (implementation) => {
        const todo = Todo.create('todo 1');
        const { result } = getTestHarness(implementation, todo.id);
        act(() => {
          result.current.todoRepository.create(todo);
        });
        expect(result.current.useGetOneById?.completedAt).toBeUndefined();
        act(() => {
          result.current.todoRepository.update(todo.complete());
        });
        expect(result.current.useGetOneById?.completedAt).not.toBeUndefined();
      },
    );
  });
});
