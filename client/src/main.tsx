import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import { ErrorPage } from './ErrorPage.tsx';
import { Providers } from './providers/index.tsx';
import { TodoRedux } from './routes/TodoRedux/index.tsx';
import { TodoReactContext } from './routes/TodoReactContext/index.tsx';

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>,
);
