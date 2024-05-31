import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import {
  redux as useReduxTodoRepository,
  reactContext as useReactContextTodoRepository,
  zustand as useZustandTodoRepository,
} from '../DI';
import { Todo } from 'src/modules/todo/domain/Todo';
import { getReduxWrapper } from 'src/__test__/getReduxWrapper';
import { getTodosProviderWrapper } from 'src/__test__/getTodosProviderWrapper';

type ChildrenProps = {
  children: ReactNode;
};

describe('TodoRepository', () => {
  const implementations = [
    // all implementations listed here
    'redux',
    'reactContext',
    'zustand',
  ] as const;

  const getReduxTestHarness = () => {
    const { ReduxWrapper } = getReduxWrapper();
    return renderHook(useReduxTodoRepository, {
      wrapper: ({ children }: ChildrenProps) => (
        <ReduxWrapper>{children}</ReduxWrapper>
      ),
    });
  };

  const getReactContextTestHarness = () => {
    const { TodosProviderWrapper } = getTodosProviderWrapper();
    return renderHook(useReactContextTodoRepository, {
      wrapper: ({ children }: ChildrenProps) => (
        <TodosProviderWrapper>{children}</TodosProviderWrapper>
      ),
    });
  };

  const getZustandTestHarness = () => {
    return renderHook(useZustandTodoRepository);
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
    'Impl: %s getAll() is initially empty',
    (implementation) => {
      const { result } = getTestHarness(implementation);

      expect(result.current.getAll()).toEqual([]);
    },
  );

  it.each(implementations)(
    'Impl: %s create() adds a new todo',
    async (implementation) => {
      const { result } = getTestHarness(implementation);

      const todo = Todo.create('test todo');

      act(() => {
        result.current.create(todo);
      });

      expect(result.current.getOneById(todo.id)).toEqual(todo);
    },
  );

  it.each(implementations)(
    'Impl: %s delete() removes a todo',
    (implementation) => {
      const { result } = getTestHarness(implementation);

      const todo = Todo.create('test todo');

      act(() => {
        result.current.create(todo);
      });

      expect(result.current.getOneById(todo.id)).toEqual(todo);

      act(() => {
        result.current.delete(todo.id);
      });

      expect(result.current.getOneById(todo.id)).toBeUndefined();
    },
  );

  it.each(implementations)(
    'Impl: %s deleteAll() removes all todos',
    (implementation) => {
      const { result } = getTestHarness(implementation);

      const todo1 = Todo.create('todo 1');
      const todo2 = Todo.create('todo 2');

      act(() => {
        result.current.create(todo1);
        result.current.create(todo2);
      });

      expect(result.current.getOneById(todo1.id)).toEqual(todo1);
      expect(result.current.getOneById(todo2.id)).toEqual(todo2);

      act(() => {
        result.current.deleteAll();
      });

      expect(result.current.getOneById(todo1.id)).toBeUndefined();
      expect(result.current.getOneById(todo2.id)).toBeUndefined();
    },
  );

  it.each(implementations)(
    'Impl: %s update() updates a todo',
    (implementation) => {
      const { result } = getTestHarness(implementation);

      const todo = Todo.create('todo 1');

      act(() => {
        result.current.create(todo);
      });

      expect(result.current.getOneById(todo.id)).toEqual(todo);
      expect(result.current.getOneById(todo.id)?.completedAt).toBeUndefined();

      act(() => {
        result.current.update(todo.complete());
      });

      expect(
        result.current.getOneById(todo.id)?.completedAt,
      ).not.toBeUndefined();
    },
  );
});
