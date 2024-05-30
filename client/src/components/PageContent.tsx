'use client';

import { Box } from '@mantine/core';
import { NAVBAR_HEIGHT } from 'src/components/NavBar';

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <Box h={`calc(100% - ${NAVBAR_HEIGHT})`}>{children}</Box>;
};
