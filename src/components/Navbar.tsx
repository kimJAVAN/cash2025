// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { Box, Flex, Button, HStack, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { ColorModeButton } from './ui/color-mode';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box as="nav" bg="bg.muted" px={4} py={3} borderBottomWidth="1px">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">Shop</Text>
        </Link>
        
        <HStack gap={4}>
          <Link to="/products">
            <Button colorScheme="green">상품목록</Button>
          </Link>
          
          {user ? (
            <>
              <Text>안녕하세요, {user.name}님</Text>
              <Button onClick={logout} colorScheme="red">로그아웃</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button colorScheme="teal">로그인</Button>
              </Link>
              <Link to="/signup">
                <Button colorScheme="blue">회원가입</Button>
              </Link>
            </>
          )}
          
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
}