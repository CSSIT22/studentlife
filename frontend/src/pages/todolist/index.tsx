import React from "react"
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Image,
    Heading,
    Input,
    Center,
    Select,
    Spacer,
    Box,
    StackDivider,
    VStack,
    GridItem,
    Flex,
    Text,
    Link,
    ButtonGroup,
    MenuButton,
    Menu,
    MenuItem,
    MenuList,
    Progress,
} from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import { PhoneIcon, AddIcon, ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"

const index = () => {
    return (
        <ToDoListAppBody>
            <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box p="2">
                    <Heading size="3xl">To Do List</Heading>
                </Box>
                <Spacer />
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Sorting
                    </MenuButton>
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
                        <Text fontSize={"3xl"}>CSC210 : Work 1</Text>
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
                            CSC210 : Work 2
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
                        <Text fontSize={"3xl"}>CSC220</Text>
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
                            CSC213
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
                        <Text fontSize={"3xl"}>LNG220</Text>
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

export default index
