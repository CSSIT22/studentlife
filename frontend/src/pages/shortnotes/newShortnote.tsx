import {
    Box,
    Flex,
    Input,
    Select,
    Spacer,
    Textarea,
    VStack,
    Text,
    Button,
    Heading,
    Radio,
    RadioGroup,
    Stack,
} from "@chakra-ui/react"
import React from "react"
import AppBody from "../../components/share/app/AppBody"

const newShortnote = () => {
    return (
        <AppBody>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box bg={"white"} rounded={8} p={10} w={"60%"}>
                    <VStack spacing={4}>
                        <Heading size={"lg"}>Create new shortnote</Heading>
                        <Box>
                            <Select variant="filled" placeholder="Course" size={"sm"} rounded={4} />
                        </Box>
                        <Box w={"100%"}>
                            <Text>Shortnote's name</Text>
                            <Input variant="outline" placeholder="" />
                        </Box>
                        <Box w={"100%"}>
                            <Text>Description</Text>
                            <Textarea placeholder="" />
                        </Box>
                        <Flex>
                            <RadioGroup defaultValue="TRUE">
                                <Stack spacing={5} direction="row">
                                    <Radio colorScheme="orange" value="TRUE">
                                        Public
                                    </Radio>
                                    <Spacer />
                                    <Radio colorScheme="orange" value="FALSE">
                                        Private
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Flex>
                        <Button colorScheme="orange" w={"100%"}>
                            Create
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </AppBody>
    )
}

export default newShortnote
