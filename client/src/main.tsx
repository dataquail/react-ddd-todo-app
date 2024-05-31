import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import { ErrorPage } from './ErrorPage.tsx';
import { Providers } from './providers';
import { TodoRedux } from './routes/TodoRedux';
import { TodoReactContext } from './routes/TodoReactContext';
import { TodoZustand } from './routes/TodoZustand';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/todo/reactContext" replace />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/todo/reactContext',
      element: <TodoReactContext />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/todo/redux',
      element: <TodoRedux />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/todo/zustand',
      element: <TodoZustand />,
      errorElement: <ErrorPage />,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>,
);
