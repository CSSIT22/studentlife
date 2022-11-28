import { ChevronDownIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Flex, Heading, Link, Text, Spacer, Menu, MenuButton, Button, MenuList, MenuItem, Progress, Box } from "@chakra-ui/react"
import React from "react"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"

const insidefolder = () => {
    return (
        <ToDoListAppBody>
            <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box p="2">
                    <Heading size="3xl">CSC210</Heading>
                </Box>
                <Spacer />
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Sorting
                    </MenuButton>
                    <Link href="/todolist/folderpage">
                        <Button colorScheme="orange">Folder</Button>
                    </Link>
                    <MenuList>
                        <MenuItem>Due Date</MenuItem>
                        <MenuItem>A-Z</MenuItem>
                        <MenuItem>Complete</MenuItem>
                        <MenuItem>Incomplete</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#ECECEC" rounded="lg">
                <Flex alignItems={"center"}>
                    <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} />
                    <Box>
                        <Text fontSize={"3xl"}>Algorithm HW 1</Text>
                    </Box>
                    <Spacer />
                    <Box textAlign={"right"} pr={"1rem"} width="">
                        Finished
                    </Box>
                </Flex>
            </Box>

            <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#ECECEC" rounded="lg">
                <Flex alignItems={"center"}>
                    <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} />
                    <Box>
                        <Text as="b" fontSize={"3xl"}>
                            In Class : Tower of Hanoi
                        </Text>
                    </Box>
                    <Spacer />
                    <Box textAlign={"right"} pr={"1rem"} width=""></Box>
                </Flex>
            </Box>

            <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#ECECEC" rounded="lg">
                <Flex alignItems={"center"}>
                    <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} />
                    <Box>
                        <Text color={"red"} as="b" fontSize={"3xl"}>
                            Quiz 1
                        </Text>
                    </Box>
                    <Spacer />
                    <Box textAlign={"right"} pr={"1rem"} width="">
                        Failed
                    </Box>
                </Flex>
            </Box>

            <Box p="5" alignItems={"center"}>
                <Text fontSize={"2xl"} textAlign={"center"}>
                    Work Progress
                </Text>
                <Progress marginTop={2} value={20} size="lg" colorScheme="orange" />
            </Box>
        </ToDoListAppBody>
    )
}

export default insidefolder
