import { Card, CardBody, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

function ProductCard({img, title, price}) {
  return (
      <Card maxW="sm" width='19%'>
        <CardBody>
          <Image
          
            src={img}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            {/* <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text> */}
            <Text color="blue.600" fontSize="2xl">
            ₼{price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        {/* <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter> */}
      </Card>
  );
}

export default ProductCard;
