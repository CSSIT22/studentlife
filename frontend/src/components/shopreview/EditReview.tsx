import { EditIcon } from '@chakra-ui/icons'
import { Flex, Box, useDisclosure, Button, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Image } from '@chakra-ui/react'
import React from 'react'
import RatingStar from './RatingStar'

const EditReview = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box onClick={onOpen} width={"100%"} as="button">
                <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <EditIcon mr={2} />
                    Edit
                </Flex>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mt={3}>
                        <Heading>Edit Your Review</Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <RatingStar size={45} icon="star" scale={5} fillColor="black" strokeColor="grey" />

                        <Textarea
                            colorScheme="white"
                            focusBorderColor="black"
                            placeholder="Add Review"
                            marginTop={"5"}
                            minHeight={"100px"}
                            maxHeight={"200px"}
                        ></Textarea>
                        <Input type={"file"} id="id" hidden multiple></Input>
                        <Box
                            onClick={() => {
                                document.getElementById("id")?.click()
                            }}
                            as="button"
                            paddingTop={"10px"}
                        >
                            <Image
                                src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
                                width={"40px"}
                                borderRadius="full"
                                marginLeft={"1"}
                                marginTop={"-58px"}
                                padding={"4px"}
                            />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme={"green"} color="white">
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditReview