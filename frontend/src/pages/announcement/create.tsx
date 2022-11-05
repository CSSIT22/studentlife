import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Spacer, Stack, Text, Textarea } from "@chakra-ui/react"
import React from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import AppBody from "../../components/share/app/AppBody"

const create = () => {
    return (
        <AppBody>
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl">
                    <GrClose />
                </Text>
                <Spacer />
                {/* <Box textAlign={"right"}> */}
                <Button colorScheme="orange" size="sm">
                    Announce
                </Button>
                {/* </Box> */}
            </Flex>
            <Stack spacing={3} p="5">
                {/* <FormControl isRequired>
                    <FormLabel>Select Language</FormLabel>
                    <Select placeholder="Select language">
                        <option>Thai</option>
                        <option>Japanese</option>
                    </Select>
                </FormControl> */}
                <FormControl >
                    <FormLabel>Language</FormLabel>
                    <Select isDisabled placeholder="English"></Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input placeholder="Title" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Detail</FormLabel>
                    <Textarea placeholder="Detail" size="sm" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Target Group</FormLabel>
                    <Flex>
                        <Select placeholder="Select Type">
                            <option>Everyone</option>
                            <option>Year</option>
                            <option>Major</option>
                            <option>Faculty</option>
                        </Select>
                        <Select placeholder="Select Year">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Select>
                        {/* <Select placeholder="Select Major">
                            <option>Computer Science</option>
                            <option>Math</option>
                            <option>Biology</option>
                            <option>Chemistry</option>
                        </Select>
                        <Select placeholder="Select Faculty">
                            <option>Science</option>
                            <option>Engineering</option>
                            <option>Information Technology</option>
                            <option>Economics</option>
                        </Select> */}
                    </Flex>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Expired Date</FormLabel>
                    <Input placeholder="Select exprired date" size="md" type="date" />
                </FormControl>
                <FormControl>
                    <FormLabel>Add More Language</FormLabel>
                    <Text as={"b"} fontSize="xl">
                        <BsPlusCircleFill />
                    </Text>
                </FormControl>
            </Stack>
        </AppBody>
    )
}

export default create
