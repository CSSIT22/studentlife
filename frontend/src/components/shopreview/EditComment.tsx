import { EditIcon } from '@chakra-ui/icons'
import { useDisclosure, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, Heading, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, Box, Image } from '@chakra-ui/react'
import React from 'react'
import RatingStar from './RatingStar'

const EditComment = () => {
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
                        <Heading>Edit Your Comment</Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Textarea
                            colorScheme="white"
                            focusBorderColor="black"
                            placeholder="Add Comment"
                            marginTop={"5"}
                            minHeight={"100px"}
                            maxHeight={"200px"}
                        ></Textarea>
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

export default EditComment