import { Button } from '@mantine/core';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

const routes = [{ path: '/todo/redux' }];

export const DependencySelector = () => {
  const location = useLocation();
  const matchingRoutes = matchRoutes(routes, location);
  const isRedux =
    matchingRoutes?.some((route) => route.pathname === '/todo/redux') ?? false;
  const navigate = useNavigate();

  return (
    <>
      <Button
        disabled={!isRedux}
        onClick={() => navigate('/todo/reactContext')}
      >
        React Context
      </Button>
      <Button disabled={isRedux} onClick={() => navigate('/todo/redux')}>
        Redux
      </Button>
    </>
  );
};
