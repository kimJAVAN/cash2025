// src/pages/Checkout.tsx
import { useState } from 'react';
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react';
import { Field } from '../components/ui/field';

export default function Checkout() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment processed! (Demo)');
  };

  return (
    <Box maxW="600px" mx="auto">
      <Heading mb={6}>Checkout</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" mb={6}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>Order Summary</Text>
        <Text>Product 1 - $29.99</Text>
        <Text fontSize="xl" fontWeight="bold" mt={4}>Total: $29.99</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">
          <Field label="Card Number">
            <Input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />
          </Field>
          
          <HStack gap={4}>
            <Field label="Expiry Date" flex={1}>
              <Input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </Field>
            
            <Field label="CVV" flex={1}>
              <Input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
              />
            </Field>
          </HStack>
          
          <Button type="submit" colorScheme="blue" size="lg" width="full">
            Complete Payment
          </Button>
        </VStack>
      </form>
    </Box>
  );
}