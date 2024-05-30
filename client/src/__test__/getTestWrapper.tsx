import { ReactNode } from 'react';
import { InitialState } from 'src/lib/store';
import { getReduxWrapper } from 'src/__test__/getReduxWrapper';
import { getThemeWrapper } from 'src/__test__/getThemeWrapper';
import { getTodosProviderWrapper } from 'src/__test__/getTodosProviderWrapper';

export const getTestWrapper = ({
  initialState,
}: {
  initialState?: InitialState;
} = {}) => {
  const { store, ReduxWrapper } = getReduxWrapper({ initialState });
  const { ThemeWrapper } = getThemeWrapper();
  const { TodosProviderWrapper } = getTodosProviderWrapper();

  return {
    store,
    TestWrapper: ({ children }: { children: ReactNode }) => (
      <ReduxWrapper>
        <TodosProviderWrapper>
          <ThemeWrapper>{children}</ThemeWrapper>
        </TodosProviderWrapper>
      </ReduxWrapper>
    ),
  };
};
