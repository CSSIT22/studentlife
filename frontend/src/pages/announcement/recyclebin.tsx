import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    useDisclosure,
    Stack,
    Box,
} from "@chakra-ui/react"
import React from "react"
import HeaderPage from "../../components/annoucement/HeaderPage"
import PostOnRecycle from "../../components/annoucement/PostOnRecycle"
import AppBody from "../../components/share/app/AppBody"

const recyclebin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <AppBody>
            <HeaderPage head="Recycle bin" />
            <PostOnRecycle topic="Hello world" sender="SAMO-SIT" expired="48:12:02" />
            <PostOnRecycle topic="Hi" sender="SAMO-MEDIA" expired="48:12:02" />
            <PostOnRecycle topic="Hi kub" sender="SAMO-SCI" expired="48:12:02" />
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"xs"} isCentered>
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
                <ModalContent>
                    <ModalHeader>Recover the announcement</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text>Are you sure to recover this announcement?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Recover
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Stack position={"fixed"} bottom="5rem" width="91%">
                <Button onClick={onOpen} height="3.5rem">Recover announcement</Button>
                <Button>Cancel</Button>
            </Stack>
        </AppBody>
    )
}

export default recyclebin
