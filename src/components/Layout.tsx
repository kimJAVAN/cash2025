// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from './Header';

export default function Layout() {
  return (
    <Box minH="100vh">
      <Header />
      <Box as="main" p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}