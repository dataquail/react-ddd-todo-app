import { SegmentedControl } from '@mantine/core';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';

const routes = [{ path: '/todo/redux' }];

export const DependencySelector = () => {
  const location = useLocation();
  const matchingRoutes = matchRoutes(routes, location);
  const isRedux =
    matchingRoutes?.some((route) => route.pathname === '/todo/redux') ?? false;
  const navigate = useNavigate();

  return (
    <SegmentedControl
      value={isRedux ? 'redux' : 'reactContext'}
      onChange={(value) => navigate(`/todo/${value}`)}
      data={[
        { label: 'React Context', value: 'reactContext' },
        { label: 'Redux', value: 'redux' },
      ]}
    />
  );
};
