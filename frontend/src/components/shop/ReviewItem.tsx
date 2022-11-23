import { Flex, Box, Image, Text, useBreakpointValue, LinkBox, LinkOverlay, useDisclosure, Button, Center, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsStarFill } from "react-icons/bs"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

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
    return (
        <Box onClick={onOpen} borderRadius="3xl" shadow="xl" p="7" bg="#E69C73" cursor={"pointer"}>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur="2px" />
                <ModalContent>
                    <ModalHeader>Review Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex align="center" gap="5" wrap="wrap">
                            <Image mt="3" w="10" h="10" src={userPhoto} borderRadius="full" alt="Profile Photo"></Image>
                            <Text fontSize="lg" color="#000" fontWeight="500">
                                {userName}
                                <Flex>{stars(rating)}</Flex>
                            </Text>
                            <Spacer />
                            <Text>Review Posted on: {reviewDate}</Text>
                        </Flex>
                        <Text my="5" fontSize="2xl" color="#000" fontWeight="bold">
                            {reviewTitle}
                        </Text>
                        <Text>{reviewBody}</Text>
                        {image ? <Image mt="3" w="3xs" h="3xs" src={image} borderRadius="lg" alt="Review Photo" objectFit="cover"></Image> : <></>}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Okay
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex gap={3} align="center">
                {/* <Text fontSize="xl" color="#000" fontWeight="400" noOfLines={1} lineHeight="tight">{reviewTitle}</Text> */}
            </Flex>

            <Flex pt="3" gap=" 3">
                <Image mt="3" w="10" h="10" src={userPhoto} borderRadius="full" alt="Profile Photo"></Image>
                <Flex direction="column">
                    <Flex>{stars(rating)}</Flex>
                    <Text fontSize="lg" color="#000" fontWeight="500">
                        {userName}
                    </Text>
                    <Text noOfLines={2} color="#333">
                        {reviewBody}
                    </Text>
                    {image ? <Image mt="3" w="3xs" h="3xs" src={image} borderRadius="lg" alt="Review Photo" objectFit="cover"></Image> : <></>}
                </Flex>
            </Flex>
        </Box>
    )
}

export default ReviewItem
