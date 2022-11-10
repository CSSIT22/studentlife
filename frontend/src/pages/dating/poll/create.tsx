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
} from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import { useState } from "react"

const CreateActivityPoll = () => {
    const [header, setInput] = useState("")
    const handleInputChange = (e: any) => setInput(e.target.value)
    const toast = useToast()
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
