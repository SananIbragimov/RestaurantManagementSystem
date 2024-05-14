import {
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

function ProductCard({ img, title, price }) {
  return (
    <Card maxW="sm" width="19%">
      <CardBody>
        <Image
          src={img}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text color="blue.600" fontSize="2xl">
            ₼{price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
}

export default ProductCard;
