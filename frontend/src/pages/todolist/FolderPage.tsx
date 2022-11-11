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
import React from "react"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import AppBody from "src/components/share/app/AppBody"

const folderpage = () => {
    return (
        <ToDoListAppBody>
            <Heading as="h1" size="3xl">
                Folder Page
            </Heading>
        </ToDoListAppBody>
    )
}

export default folderpage
