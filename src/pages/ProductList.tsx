import { SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "상품1", price: 10000 },
  { id: 2, name: "상품2", price: 20000 },
  { id: 3, name: "상품3", price: 30000 },
];

export default function ProductList() {
  return (
    <Box p={4}>
      <Heading mb={4}>상품 목록</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            _hover={{ shadow: "md" }}
          >
            <Link to={`/products/${product.id}`}>
              <Heading size="md">{product.name}</Heading>
              <Text>{product.price}원</Text>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
