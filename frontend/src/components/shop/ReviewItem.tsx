import { Flex, Box, Image, Text, useBreakpointValue, LinkBox, LinkOverlay, useDisclosure, Button, Center, Spacer, Avatar } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsStarFill } from "react-icons/bs"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import Pill from "./Pill"

const ReviewItem: FC<{
    userName: string
    userId: any
    reviewTitle: string
    reviewBody: string
    image?: string
    rating: number
    reviewDate: string
}> = ({ userName, userId, reviewTitle, reviewBody, image, rating, reviewDate }) => {
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
            <Flex pt="0" gap=" 24px" align="center" wrap= "wrap">
                <Avatar name="" src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + userId}></Avatar>
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
    const starDisplay = (
        <Pill ml = {{base: null, sm: "auto"}}>
            <BsStarFill color="#fecd04" size="1.3rem"></BsStarFill>
            <Text as={"b"} fontSize={"md"} color="white">{rating + "/5"}</Text>
        </Pill>
    )
    const reviewDetails = <Flex direction="column">
        <Text noOfLines={2} as={"b"} color={"black"} size={"sm"}>
            {reviewBody}
        </Text>
        {image ? <Image mt="3" w="28" h="28" src={image} borderRadius="xl" border="2px solid" shadow="lg" alt="Review Photo" objectFit="cover"></Image> : <></>}
    </Flex>
    return (
        <Box onClick={onOpen} rounded={"2xl"} shadow="md" p="7" bg="#fff" cursor={"pointer"} _hover={{ transform: "scale(1.03)" }} _active={{ transform: "scale(1.00)" }} transitionDuration="300ms">
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
                            {image ? <Image mt="3" w="3xs" h="3xs" src={image} border="2px solid" shadow="lg" borderRadius="3xl" alt="Review Photo" objectFit="cover"></Image> : <></>}
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
                {userReviewInformation(true)}
                {reviewDetails}
            </Flex>
        </Box>
    )
}

export default ReviewItem
