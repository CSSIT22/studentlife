import { Box, Flex, Text, Image, HStack, Button, Center, VStack, Badge, Tooltip, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { placeHolderImg } from './content/extraData'
import convertCurrency from './functions/usefulFunctions'

type propsType =
    FC<{
        couponCode: string
        discountAmount: number
        minSpend: number
        details: string
        validUntil: string
        productId: number
        image: string
    }>

const styles = {
    productBox: {
        mt: "6",
        background: "white",
        width: "13rem", height: "24rem",
        borderRadius: "lg",
        overflow: "hidden",
        shadow: "xl",
        border: "1px solid",
    },
    productName: {
        mt: 1,
        fontWeight: 'semibold',
        as: 'h4',
        lineHeight: 'tight',
        noOfLines: 1
    },
    animationStyles: {
        initial: { scale: 0.1 },
        animate: { scale: 1 },
        transition: { default: { ease: "backOut", duration: 0.5 } }
    }
}
const ProductCouponDisplay: propsType = ({ couponCode, discountAmount, minSpend, details, validUntil, productId, image }) => {
    const toast = useToast()
    function copyCode (){
        navigator.clipboard.writeText(couponCode)
        toast({
            title: 'Coupon Code Copied to Clipboard',
            status: 'success',
            isClosable: true,
            duration: 900,
        })
    }
    let displayImage: string
    if (image && image != undefined){
        displayImage = image
    } else {
        displayImage = placeHolderImg
    }
    return (
        <Tooltip label={details}>
        <motion.div initial={styles.animationStyles.initial} animate={styles.animationStyles.animate} transition={styles.animationStyles.transition}>
            <Box sx={styles.productBox}>
                <Flex direction="column">
                    <Link to={"/shop/product/" + productId}>
                        <Box mt="0" mx="0" mb="2" borderRadius="lg" overflow="hidden" shadow=""  _hover= {{ transform: "scale(0.8)" }} transitionDuration= "300ms">
                            <Image width="13rem" height="12rem" src={displayImage} alt="Img" objectFit="cover" />
                        </Box>
                    </Link> 
                    <Box px="6" pt="1">
                        <HStack justify="center" wrap="wrap">
                            <Text fontSize="xl" fontWeight="700">
                                {convertCurrency(discountAmount)}
                            </Text>
                            <Text fontSize={"sm"} fontWeight="400" align="center">
                                Min. Spend {convertCurrency(minSpend)}
                            </Text>
                            <Text fontSize={"sm"} fontWeight="400" align="center">
                                Valid Till: {validUntil}
                            </Text>
                        </HStack>
                        <Box my="2" p="0" borderTop="dotted 3px"></Box>
                        <Center mt="3">
                            <VStack>
                            <Text fontSize={"sm"}>Use Code</Text>
                            <Button onClick={copyCode}>{couponCode}</Button>
                            </VStack>
                        </Center>
                        
                    </Box>
                </Flex>
            </Box>

        </motion.div>
        </Tooltip>
    )
}

export default ProductCouponDisplay