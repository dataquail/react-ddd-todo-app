import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { redux as useReduxTodoRepository } from '../DI';
import { reactContext as useReactContextTodoRepository } from '../DI';
import { Todo } from 'src/modules/todo/domain/Todo';
import { getReduxWrapper } from 'src/__test__/getReduxWrapper';
import { getTodosProviderWrapper } from 'src/__test__/getTodosProviderWrapper';
import { redux as useReduxTodoRepositoryReactive } from '../DIReactive';
import { reactContext as useReactContextTodoRepositoryReactive } from '../DIReactive';

type ChildrenProps = {
  children: ReactNode;
};

describe('TodoRepositoryReactive', () => {
  const implementations = [
    // all implementations listed here
    'redux',
    'reactContext',
  ] as const;

  describe('getAll()', () => {
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

    const getTestHarness = (implementation: 'redux' | 'reactContext') => {
      if (implementation === 'redux') {
        return getReduxTestHarness();
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

    const getTestHarness = (
      implementation: 'redux' | 'reactContext',
      todoId: string,
    ) => {
      if (implementation === 'redux') {
        return getReduxTestHarness(todoId);
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
