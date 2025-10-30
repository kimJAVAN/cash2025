import { Box, Button, Input, VStack } from "@chakra-ui/react";

export default function Login() {
  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Button colorScheme="teal" w="full">
          로그인
        </Button>
      </VStack>
    </Box>
  );
}
