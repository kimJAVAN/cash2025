// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { useAuth } from '../components/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={6}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">
          <Field label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          
          <Field label="Password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          
          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
          
          <Text textAlign="center">
            Don't have an account?{' '}
            <RouterLink to="/signup">
              <Text as="span" color="blue.500" textDecoration="underline">
                Sign up
              </Text>
            </RouterLink>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}