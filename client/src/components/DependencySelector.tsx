import { SegmentedControl } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

export const DependencySelector = () => {
  const location = useLocation();
  const implementationFromRoute = location.pathname.replace('/todo/', '');
  const navigate = useNavigate();

  return (
    <SegmentedControl
      value={implementationFromRoute}
      onChange={(value) => navigate(`/todo/${value}`)}
      data={[
        { label: 'React Context', value: 'reactContext' },
        { label: 'Redux', value: 'redux' },
        { label: 'Zustand', value: 'zustand' },
      ]}
    />
  );
};
