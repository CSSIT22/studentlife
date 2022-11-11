import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure ,Box} from "@chakra-ui/react"
function Nmodal(props : any) {
    const { isOpen, onOpen, onClose } =useDisclosure()
    return (
        <>
            <Box onClick={onOpen}>Report</Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered ={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Test</ModalBody>

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

export default Nmodal
