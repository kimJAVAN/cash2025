// src/components/Header.tsx
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Button, HStack } from '@chakra-ui/react';
import { useAuth } from '../components/AuthContext';
import { ColorModeButton } from './ui/color-mode';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <Box as="header" bg="bg.muted" px={4} py={3} borderBottomWidth="1px">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <RouterLink to="/">
          <Box fontSize="xl" fontWeight="bold">Shop</Box>
        </RouterLink>
        
        <HStack gap={4}>
          <RouterLink to="/products">
            <Button variant="ghost">Products</Button>
          </RouterLink>
          
          {user ? (
            <>
              <Box>Hello, {user.name}</Box>
              <Button onClick={logout} variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <RouterLink to="/login">
                <Button variant="outline">Login</Button>
              </RouterLink>
              <RouterLink to="/signup">
                <Button colorScheme="blue">Sign Up</Button>
              </RouterLink>
            </>
          )}
          
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
}