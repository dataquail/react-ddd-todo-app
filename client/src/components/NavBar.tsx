import { Box, Center } from '@mantine/core';
import { DependencySelector } from './DependencySelector';

export const NAVBAR_HEIGHT = '60px';

export const NavBar = () => {
  return (
    <Center>
      <Box h={NAVBAR_HEIGHT} pl="lg" pr="lg" pt="xs">
        <DependencySelector />
      </Box>
    </Center>
  );
};
