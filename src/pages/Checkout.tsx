// src/pages/Checkout.tsx
import { useState } from 'react';
import { Box, Heading, Input, Button, VStack, Text, HStack } from '@chakra-ui/react';
import { Field } from '../components/ui/field';

export default function Checkout() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('결제가 완료되었습니다! (데모)');
  };

  return (
    <Box maxW="600px" mx="auto">
      <Heading mb={6}>결제하기</Heading>
      
      <Box p={6} borderWidth="1px" borderRadius="lg" mb={6}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>주문 요약</Text>
        <Text>상품 1 - ₩29,900</Text>
        <Text fontSize="xl" fontWeight="bold" mt={4}>총액: ₩29,900</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">
          <Field label="카드 번호">
            <Input
              value={cardNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />
          </Field>
          
          <HStack gap={4}>
            <Field label="유효기간" flex={1}>
              <Input
                value={expiry}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </Field>
            
            <Field label="CVV" flex={1}>
              <Input
                value={cvv}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value)}
                placeholder="123"
                required
              />
            </Field>
          </HStack>
          
          <Button type="submit" colorScheme="blue" size="lg" width="full">
            결제 완료
          </Button>
        </VStack>
      </form>
    </Box>
  );
}