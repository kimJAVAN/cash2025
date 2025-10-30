// src/pages/Signup.tsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { useAuth } from '../components/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password, name);
    navigate('/');
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={6}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">
          <Field label="Name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>
          
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
            Sign Up
          </Button>
          
          <Text textAlign="center">
            Already have an account?{' '}
            <RouterLink to="/login">
              <Text as="span" color="blue.500" textDecoration="underline">
                Login
              </Text>
            </RouterLink>
          </Text>
        </VStack>
      </form>
    </Box>
  );
}