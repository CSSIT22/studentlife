import {
    Box,
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Button,
    useToast,
    SimpleGrid,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import { useState } from "react"

const CreateActivityPoll = () => {
    const [header, setInput] = useState("")
    const handleInputChange = (e: any) => setInput(e.target.value)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const isTooLongHeader = header.length >= 100
    const isTooShortHeader = header.length < 10
    let isNotValid = isTooLongHeader && isTooShortHeader
    function handleSubmit() {
        if (!isTooLongHeader && !isTooShortHeader) {
            alert("Header: " + header)
        } else {
            toast({
                title: "Invalid input!",
                description: "Your poll is incomplete. Please edit and resubmit.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
        }
    }

    return (
        <DatingAppBody>
            <Box mt="50px" p="50px" bg="#E67F45" borderRadius={"20px"}>
                <Heading color={"white"} pb={"20px"}>
                    Create a poll
                </Heading>
                <Stack>
                    <Center>
                        <FormControl isInvalid={!isNotValid} isRequired>
                            <FormLabel color={"white"}>Poll header</FormLabel>
                            <Input
                                id="header"
                                type="text"
                                value={header}
                                onChange={handleInputChange}
                                backgroundColor="white"
                                placeholder="Your poll header"
                                size="sm"
                                borderColor="white"
                                maxLength={100}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                            />
                            {!isTooShortHeader ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="yellow">
                                    The minimum header length is 10 characters. You can't type less than this.
                                </FormErrorMessage>
                            )}
                            {!isTooLongHeader ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="yellow">
                                    The maximum header length is 100 characters. You can't type more than this.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </Center>
                    <Center>
                        <FormControl isRequired>
                            <FormLabel color={"white"}>Poll topic</FormLabel>
                            <Button
                                borderRadius={"2px"}
                                onClick={onOpen}
                                isOpen={isOpen}
                                backgroundColor="white"
                                color="gray"
                                size="sm"
                                p="20px"
                                pt="5px"
                                pb="5px"
                                isCentered
                            >
                                Select poll topic
                            </Button>
                            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Wait for design...</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
                                    <ModalFooter>
                                        <Button onClick={onClose}>Close</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </FormControl>
                    </Center>
                    <Center>
                        <Button type="submit" borderRadius={"full"} colorScheme="orange" onClick={() => handleSubmit()} mt={"80px"} p="30px">
                            Done
                        </Button>
                    </Center>
                </Stack>
            </Box>
        </DatingAppBody>
    )
}

export default CreateActivityPoll
