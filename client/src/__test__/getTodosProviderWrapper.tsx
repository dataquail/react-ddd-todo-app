import { ReactNode } from 'react';
import { TodosProvider } from 'src/modules/todo/infrastructure/repositories/TodoRepository/reactContextImpl/todosReactContextConfig';

export const getTodosProviderWrapper = () => {
  return {
    TodosProviderWrapper: ({ children }: { children: ReactNode }) => (
      <TodosProvider>{children}</TodosProvider>
    ),
  };
};
