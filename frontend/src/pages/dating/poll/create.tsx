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
    Textarea,
    Select,
    Flex,
} from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import { useState } from "react"

const CreateActivityPoll = () => {
    const [header, setHeaderInput] = useState("")
    const handleInputHeaderChange = (e: any) => setHeaderInput(e.target.value)
    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)
    const [location, setLocationInput] = useState("")
    const handleInputLocationChange = (e: any) => {
        setLocationInput(e.target.value)
    }
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const isTooLongHeader = header.length >= 100
    const isTooShortHeader = header.length < 10
    let isValidHeader = isTooLongHeader && isTooShortHeader
    const isTooLongDescription = description.length >= 250
    const isTooLongLocation = location.length >= 100
    const isTooShortLocation = location.length < 5
    let isValidLocation = isTooLongLocation && isTooShortLocation

    const res = ["Somchai Hotel", "Somsri Resturant"]

    function handleChoose(locate: any) {
        console.log(locate)
        setLocationInput(locate)
    }

    function handleSubmit() {
        if (!isTooLongHeader && !isTooShortHeader && !isTooLongDescription) {
            alert("Header: " + header + " Description: " + description + " Location: " + location)
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
                        <FormControl isInvalid={!isValidHeader} isRequired>
                            <FormLabel color={"white"}>Poll header</FormLabel>
                            <Input
                                borderRadius={"6px"}
                                id="header"
                                type="text"
                                value={header}
                                onChange={handleInputHeaderChange}
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
                                <FormErrorMessage color="yellow">The minimum header length is 10 characters. Type something.</FormErrorMessage>
                            )}
                            {!isTooLongHeader ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="yellow">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
                            )}
                        </FormControl>
                    </Center>
                    <Center>
                        <FormControl isRequired>
                            <FormLabel color={"white"}>Poll topic</FormLabel>
                            <Button
                                borderRadius={"6px"}
                                onClick={onOpen}
                                //isOpen={isOpen}
                                backgroundColor="white"
                                color="gray"
                                size="sm"
                                p="20px"
                                pt="5px"
                                pb="5px"
                                //isCentered
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
                        <FormControl isInvalid={isTooLongDescription} pt="8px">
                            <FormLabel color={"white"}>Poll description</FormLabel>
                            <Textarea
                                borderRadius={"6px"}
                                id="description"
                                value={description}
                                onChange={handleInputDescriptionChange}
                                backgroundColor="white"
                                placeholder="Description"
                                size="sm"
                                borderColor="white"
                                maxLength={250}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                            />
                            {!isTooLongDescription ? (
                                <FormHelperText></FormHelperText>
                            ) : (
                                <FormErrorMessage color="yellow">
                                    The maximum description length is 250 characters. You cannot type more.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </Center>
                    {/* <Center> */}

                    <FormControl isInvalid={!isValidLocation} isRequired>
                        <FormLabel color={"white"}>Location</FormLabel>
                        <Flex>
                            <Input
                                borderRadius={"6px"}
                                id="location"
                                type="text"
                                value={location}
                                onChange={handleInputLocationChange}
                                backgroundColor="white"
                                placeholder="Location"
                                size="sm"
                                borderColor="white"
                                maxLength={100}
                                errorBorderColor="red"
                                isRequired
                                shadow="lg"
                            />
                            {/* If that user haven't use the restaurant function we should block this feature*/}
                            <Select
                                borderRadius={"6px"}
                                placeholder="Pick from your favorites."
                                size="sm"
                                bgColor="white"
                                pl="20px"
                                errorBorderColor="red"
                                shadow="lg"
                                onChange={(e: any) => {
                                    // handleChoose
                                    handleInputLocationChange(e)
                                    // console.log("VA: " + state.value)
                                }}
                            >
                                {res.map((value) => {
                                    return <option key={value}>{value}</option>
                                })}
                            </Select>
                        </Flex>
                        {!isTooShortLocation ? (
                            <FormHelperText color="white">You are now using {location} as a location.</FormHelperText>
                        ) : (
                            <FormErrorMessage color="yellow">The minimum header length is 5 characters. Type something.</FormErrorMessage>
                        )}
                        {!isTooLongLocation ? (
                            <FormHelperText></FormHelperText>
                        ) : (
                            <FormErrorMessage color="yellow">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
                        )}
                    </FormControl>

                    {/* </Center> */}
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
