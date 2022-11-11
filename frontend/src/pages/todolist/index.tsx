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
} from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"

const index = () => {
    return (
        <ToDoListAppBody>
            <Heading as="h1" size="3xl" noOfLines={1}>
                To Do List
            </Heading>
        </ToDoListAppBody>
    )
}

export default index
