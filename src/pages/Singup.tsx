import { Box, Button, Input, VStack } from "@chakra-ui/react";

export default function Signup() {
  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Input placeholder="이름" />
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" type="password" />
        <Button colorScheme="blue" w="full">
          회원가입
        </Button>
      </VStack>
    </Box>
  );
}
