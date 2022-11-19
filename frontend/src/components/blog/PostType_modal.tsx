import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Center,
    Box,
    Image,
} from "@chakra-ui/react"
import React from "react"

function PostType_modal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box>
                <Button mt={4} onClick={onOpen}>
                    Post Type
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src="https://i.redd.it/ujfngj2v25k91.jpg" alt="PostImage" objectFit={"cover"} boxSize="-moz-max-content" />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostType_modal
