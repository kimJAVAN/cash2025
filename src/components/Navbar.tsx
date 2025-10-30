import { Box, HStack, Button, Spacer, Text } from "@chakra-ui/react";
import { useColorMode } from "./../components/ui/color-mode"
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode(); 
  const navigate = useNavigate();
  const isLoggedIn = false;

  return (
    <HStack p={4} borderBottom="1px" borderColor="gray.200">
      <Box>
        <Text fontWeight="bold" cursor="pointer" onClick={() => navigate("/")}>
          MyStore
        </Text>
      </Box>
      <Spacer />
      <HStack spacing={4}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "🌙 Dark" : "☀️ Light"}
        </Button>
        {!isLoggedIn ? (
          <>
            <Button as={Link} to="/login" colorScheme="teal">로그인</Button>
            <Button as={Link} to="/signup" colorScheme="blue">회원가입</Button>
          </>
        ) : (
          <Button colorScheme="red">로그아웃</Button>
        )}
        <Button as={Link} to="/products" colorScheme="green">상품목록</Button>
      </HStack>
    </HStack>
  );
}
