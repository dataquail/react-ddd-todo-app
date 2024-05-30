import { ReactNode, useRef } from 'react';
import { AppStore, makeStore } from 'src/lib/store';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { TodosProvider } from 'src/modules/todo/infrastructure/repositories/TodoRepository/reactContextImpl/TodosProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    const store = makeStore();
    storeRef.current = store;
  }

  return (
    <StoreProvider store={storeRef.current}>
      <TodosProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TodosProvider>
    </StoreProvider>
  );
};
