import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box textAlign="center" mt={20}>
      <Heading>환영합니다!</Heading>
      <Text mt={4}>React + Chakra UI + 라이트/다크 모드 기본 세팅</Text>
    </Box>
  );
}
