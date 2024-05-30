import { ReactNode } from 'react';
import { StoreProvider } from 'src/providers/StoreProvider';
import { InitialState, makeStore } from 'src/lib/store';

export const getReduxWrapper = ({
  initialState,
}: {
  initialState?: InitialState;
} = {}) => {
  const store = makeStore(initialState);

  return {
    store,
    ReduxWrapper: ({ children }: { children: ReactNode }) => (
      <StoreProvider store={store}>{children}</StoreProvider>
    ),
  };
};
