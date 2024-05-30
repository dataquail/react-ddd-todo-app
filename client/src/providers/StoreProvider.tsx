import { Provider } from 'react-redux';
import { AppStore } from 'src/lib/store';

export const StoreProvider = ({
  store,
  children,
}: {
  store: AppStore;
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
