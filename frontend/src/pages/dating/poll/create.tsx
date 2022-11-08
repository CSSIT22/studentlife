import { Box, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack } from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"
import { useState } from "react"

const CreateActivityPoll = () => {
    const [input, setInput] = useState("")
    const handleInputChange = (e: any) => setInput(e.target.value)

    const isError = input === ""

    return (
        <DatingAppBody>
            <Box mt="50px" p="50px" bg="orange.200" borderRadius={"20px"}>
                <Heading color={"white"}>Create a poll</Heading>
                <Stack>
                    <Center>
                        <FormControl isInvalid={isError}>
                            <Stack direction="row">
                                <FormLabel color={"white"} pt={"20px"}>
                                    Poll header:{" "}
                                </FormLabel>
                                <Input type="text" value={input} onChange={handleInputChange} backgro isRequired />
                                {!isError ? (
                                    <FormHelperText>Enter the email you'd like to receive the newsletter on.</FormHelperText>
                                ) : (
                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                )}
                            </Stack>
                        </FormControl>
                    </Center>
                </Stack>
            </Box>
        </DatingAppBody>
    )
}

export default CreateActivityPoll
