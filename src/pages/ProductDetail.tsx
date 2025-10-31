// src/pages/ProductDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Image, Text, Button, VStack, HStack } from '@chakra-ui/react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const product = {
    id,
    name: `Product ${id}`,
    price: 29.99,
    image: 'https://via.placeholder.com/500',
    description: 'This is a detailed description of the product. It includes all the features and benefits.',
  };

  return (
    <Box maxW="1200px" mx="auto">
      <Button onClick={() => navigate('/products')} mb={4} variant="ghost">
        ← Back to Products
      </Button>
      
      <HStack gap={8} align="start" flexDirection={{ base: 'column', md: 'row' }}>
        <Image src={product.image} alt={product.name} maxW="500px" />
        
        <VStack align="start" flex={1} gap={4}>
          <Heading size="2xl">{product.name}</Heading>
          <Text fontSize="3xl" fontWeight="bold" color="blue.500">
            ${product.price}
          </Text>
          <Text color="fg.muted">{product.description}</Text>
          <Button
            size="lg"
            colorScheme="blue"
            width="full"
            onClick={() => navigate('/payment/checkout')}
          >
            Buy Now
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}