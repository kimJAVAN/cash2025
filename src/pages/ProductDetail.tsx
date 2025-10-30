import { useParams } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const products = [
  { id: 1, name: "상품1", price: 10000, desc: "상품1 설명" },
  { id: 2, name: "상품2", price: 20000, desc: "상품2 설명" },
  { id: 3, name: "상품3", price: 30000, desc: "상품3 설명" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <Text>상품이 없습니다.</Text>;

  return (
    <Box p={4}>
      <Heading>{product.name}</Heading>
      <Text mt={2}>{product.price}원</Text>
      <Text mt={2}>{product.desc}</Text>
      <Button mt={4} colorScheme="green">
        결제하기
      </Button>
    </Box>
  );
}
