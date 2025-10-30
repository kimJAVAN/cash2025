// src/pages/Home.tsx
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Box maxW="1200px" mx="auto" textAlign="center" py={20}>
      <Heading size="4xl" mb={4}>Welcome to Our Shop</Heading>
      <Text fontSize="xl" mb={8} color="fg.muted">
        Discover amazing products
      </Text>
      <RouterLink to="/products">
        <Button size="lg" colorScheme="blue">Browse Products</Button>
      </RouterLink>
    </Box>
  );
}