import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Box,
    Stack,
    Input,
    FormLabel,
} from "@chakra-ui/react"
function Nmodal(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box onClick={onOpen} width={"100%"}>
                Report
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"red"} textAlign={"center"}>
                        Report
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <FormLabel>Context your require report </FormLabel>
                            <Input variant="flushed" placeholder="" />
                            <FormLabel>Reason for reporting</FormLabel>
                            <Input variant="flushed" placeholder="" />
                        </Stack>
                    </ModalBody>

                    <ModalFooter display={"flex"} justifyContent={"center"}>
                        <Button colorScheme="green" onClick={onClose}>
                            Verify and send
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Nmodal
