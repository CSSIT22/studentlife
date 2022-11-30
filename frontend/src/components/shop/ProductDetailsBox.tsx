import { Shop_Product } from '@apiType/shop'
import { Text, Box, Flex, Spacer } from '@chakra-ui/react'
import React, { FC } from 'react'
import { BsStarFill } from 'react-icons/bs'
import ContentBox from 'src/components/shop/ContentBox'
import Pill from 'src/components/shop/Pill'

const ProductDetailsBox:FC<{product: Shop_Product, oRating: string | number}> = ({product, oRating}) => {
  return (
    <ContentBox>
            <Flex direction="column" p="6">
                <Text fontWeight="500" fontSize="xl" color="black">
                    Product Details of {product.productName}
                </Text>

                <Text pt="3">{renderMultipleLineText(product.productDesc)}</Text>
                <Flex gap={3} pt="5">
                    <Spacer />
                    <Pill bg="#a5e">
                        <Text color="#fff" as="b" noOfLines={1}>{product.productSize}</Text>
                    </Pill>
                    <Pill bg={"orange"}>
                        <Flex align="center" justify="center" gap={2}>
                            <Text pl={1} color="#fff" as="b" noOfLines={1}>{oRating}</Text>
                            <BsStarFill color="yellow"></BsStarFill>
                        </Flex>
                    </Pill>
                    <Pill bg={"#fff"}>
                        <Box p="2" border="1px solid" borderRadius={"3px"} bg={product.productColor}></Box>
                        <Text color={"#222"} as="b">{product.productColor}</Text>
                    </Pill>

                </Flex>
            </Flex>
        </ContentBox>
  )
}
function renderMultipleLineText(text: string) {
    return text.split("?*?").map((i, key) => {
        if (i == "" || i == " " || i == "  ") {
            return <Box p={2}></Box>
        }
        return <Text key={key} >{i}</Text>;
    })
}
export default ProductDetailsBox