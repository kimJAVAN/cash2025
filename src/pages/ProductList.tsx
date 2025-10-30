// src/pages/ProductList.tsx
import { Box, Heading, Grid, Card, Image, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Product 2', price: 39.99, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Product 3', price: 49.99, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Product 4', price: 59.99, image: 'https://via.placeholder.com/300' },
];

export default function ProductList() {
  return (
    <Box maxW="1200px" mx="auto">
      <Heading mb={6}>Products</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {MOCK_PRODUCTS.map((product) => (
          <Card.Root key={product.id}>
            <Image src={product.image} alt={product.name} />
            <Card.Body>
              <Heading size="md" mb={2}>{product.name}</Heading>
              <Text fontSize="xl" fontWeight="bold" color="blue.500" mb={4}>
                ${product.price}
              </Text>
              <RouterLink to={`/products/${product.id}`}>
                <Button width="full" colorScheme="blue">View Details</Button>
              </RouterLink>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Box>
  );
}