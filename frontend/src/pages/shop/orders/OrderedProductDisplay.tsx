import { Box, LinkBox, LinkOverlay, Spacer, VStack, Grid, GridItem, HStack, Divider } from "@chakra-ui/react"
import React, { FC } from "react"
import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import convertCurrency from "../../../components/shop/functions/usefulFunctions"

  export default function generateProducts() {
    let products = []
    for (let i = 0; i < 3; i++) {
        products.push(
            <GridItem bg="" borderBottom="1px">
                <OrderedProductDisplay
                name="Pen"
                price={10000}
                quantity={2}
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                link="/shop/product/productDetail"
            ></OrderedProductDisplay>
            </GridItem>
        )
    }
    return products
}

const OrderedProductDisplay: FC<{
    name: string
    price: number
    quantity: number
    image: string
    link: string
}> = ({ name, price, quantity, image, link}) => {
    return (
        <LinkBox>
         <LinkOverlay href={link}>

      <Center pt={2}>
            <Stack align={'center'} justify={'center'} direction={'row'}>
                <Flex position="relative" justify="center" px={10}>
                    <Box overflow="hidden">
                        <Image
                        borderColor={useColorModeValue('teal.600', 'teal.400')}
                        borderWidth={1}
                        borderStyle="solid"
                        width={{ base: 125, xl: 135 }} // don't work with chakra breakpoints
                        height={{ base: 100, xl: 118 }}
                        display="inline-block"
                        src={image}
                        alt="product picture"
                        placeholder="blur"
                        borderRadius="5%"
                        />
                    </Box>
                </Flex>
                <Box fontWeight="semibold" as="h4" lineHeight="tight" px={10}>
                    {name}
                </Box>
                <Box>
                    <Box as="span" color="gray.600" fontSize="sm" px={10}>
                        {convertCurrency(price)}
                    </Box>
                </Box>
                <Box>
                    <Box as="span" color="gray.600" fontSize="sm" px={10}>
                        {quantity}
                    </Box>
                </Box>
            </Stack>
      </Center>
      </LinkOverlay>
      </LinkBox>
    );
  }

