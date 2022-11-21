import { DeleteIcon } from "@chakra-ui/icons"
import CartProduct from "src/components/shop/CartProduct"
import ContentBox from "src/components/shop/ContentBox"
import convertCurrency from "src/components/shop/functions/usefulFunctions"
import PageTitle from "src/components/shop/PageTitle"
import ShopAppBody from "src/components/shop/ShopAppBody"
import { Flex, Box, Image, Text, useDisclosure, Button, Spacer, Checkbox, Grid, GridItem, Avatar, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsStarFill } from "react-icons/bs"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

const index = () => {

    return (
        <ShopAppBody>
            <PageTitle title="Cart" />
            <Flex direction="column" gap={2}>
                {generateCartProducts()}
            </Flex>
        </ShopAppBody>
    )
}

function generateCartProducts() {
    let cart = []
    for (let i = 0; i < 5; i++) {
        cart.push(
            <ReviewItem
                userName="Jack Phill"
                userPhoto="https://i2-prod.getsurrey.co.uk/incoming/article14551754.ece/ALTERNATES/s1200d/Jack-Phillips-a-well-known-Titanic-hero-from-Godalming.jpg"
                reviewTitle={"Wow Great"}
                reviewBody={"I bought this phone and this has great features, I highly recommend buying this phone".repeat(5)}
                rating={5}
                image="https://auspost.com.au/shop/static/WFS/AusPost-Shop-Site/-/AusPost-Shop-auspost-B2CWebShop/en_AU/feat-cat/category-tiles/MP_UnlockedPhones_3.jpg"
                reviewDate="09 Sep 2020"
            ></ReviewItem>
        )
    }
    return cart
}

const ReviewItem: FC<{
    userName: string
    userPhoto: string
    reviewTitle: string
    reviewBody: string
    image?: string
    rating: number
    reviewDate: string
}> = ({ userName, userPhoto, reviewTitle, reviewBody, image, rating, reviewDate }) => {
    function stars(count: number) {
        let starList = []
        for (let i = 0; i < count; i++) {
            starList.push(<BsStarFill color="#EBE300"></BsStarFill>)
        }
        return starList
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const userReviewInformation = (isStar?: boolean) => {
        return (
            <Flex pt="0" gap=" 24px" align="center">
                <Avatar name="" src={userPhoto}></Avatar>
                <Flex direction={"column"}>
                    <Text as={"b"} color="black" textAlign={"start"} size={"sm"}>
                        {userName.toUpperCase()}
                    </Text>
                    <Text color="gray" size={"sm"} fontWeight="500">
                        {reviewDate}
                    </Text>
                </Flex>
                {isStar == true ? starDisplay : <></>}
            </Flex>
        )
    }
    const starDisplay = <Box ml="auto" rounded={"3xl"} background={"#3D507C"} shadow={"md"}>
        <Flex justify="center" align="center" gap={2} px={2} py={1}>
            <BsStarFill color="#fecd04" size="1.6rem"></BsStarFill>
            <Text as={"b"} fontSize={"xl"} color="white">{rating + "/5"}</Text>
        </Flex>
    </Box>
    const reviewDetails = <Flex direction="column">
        <Text noOfLines={2} as={"b"} color={"black"} size={"sm"}>
            {reviewBody}
        </Text>
        {image ? <Image mt="3" w="28" h="28" src={image} borderRadius="lg" border="1px solid" alt="Review Photo" objectFit="cover"></Image> : <></>}
    </Flex>
    return (
        <Box onClick={onOpen} rounded={"2xl"} shadow="xl" p="7" bg="#fff" cursor={"pointer"} _hover={{ transform: "scale(1.01)" }} _active={{ transform: "scale(1.00)" }} transitionDuration="300ms">
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"} scrollBehavior={'inside'}>
                <ModalOverlay bg='blackAlpha.500' backdropFilter="auto" backdropBlur="2px" />
                <ModalContent>
                    <ModalHeader>Review Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {userReviewInformation(true)}
                        <Text my="5" fontSize="2xl" color="#000" fontWeight="bold">
                            {reviewTitle}
                        </Text>
                        <Text fontSize="lg" fontWeight="500" color="#000">{reviewBody}</Text>
                        <Center>
                            {image ? <Image mt="3" w="3xs" h="3xs" src={image} border="1px solid" borderRadius="lg" alt="Review Photo" objectFit="cover"></Image> : <></>}
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Okay
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex direction="column" gap={4}>
                {userReviewInformation()}
                {reviewDetails}
                {starDisplay}
            </Flex>
        </Box>
    )
}

export default index
