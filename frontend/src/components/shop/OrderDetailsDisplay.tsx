import { Box, Button, Flex, Grid, LinkBox, LinkOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure } from "@chakra-ui/react"
import React, { FC } from "react"
import Details from "../../pages/shop/orders/Details"
import generateProducts from "../../pages/shop/orders/OrderedProductDisplay"
import ContentBox from "./ContentBox"
import convertCurrency from "./functions/usefulFunctions"

const OrderDetailsDisplay: FC<{
    orderNo: number
    date: string
    time: string
    orderStatus: string
}> = ({ orderNo, date, time, orderStatus }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <ContentBox br="30" bg="#fff">
            <Flex justify="column" direction="column" p="6" gap="3" cursor={"pointer"} onClick={onOpen}>
                <Flex wrap="wrap" gap="1" justify="space-between" align="center" fontSize={{ base: "xs", sm: "sm" }} color="gray">
                    <Text>#{orderNo}</Text>
                    <Text>
                        {date} at {time}
                    </Text>
                    <Text>{orderStatus}</Text>
                </Flex>
                <Box h="min" w="full" bg="black" p="0.3"></Box>
                <Flex direction="column" fontSize={{ base: "sm", sm: "md" }} color="black" gap="2" p="4">
                    <Text>Total Paid: {convertCurrency(20.0)}</Text>
                    <Text>Status: Delivered</Text>
                    <Text>Products ordered: 13 </Text>
                </Flex>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"} scrollBehavior={"inside"}>
                <ModalOverlay bg='blackAlpha.500' backdropFilter="auto"  backdropBlur="2px" />
                <ModalContent>
                    <ModalHeader>Order Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Grid mt='2'>
                    {generateProducts()}
                    </Grid>
                    {/* <Details subtotal={10000} deliveryFee={30} couponDiscount={20} address="No.1111, Blah Blah Quarter, Bangkok Thailand" paymentMethod="Master Card"/> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Okay
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ContentBox>
    )
}

export default OrderDetailsDisplay
