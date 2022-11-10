import React from "react"
import {
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

const createtask = () => {
    return (
        <AppBody
            secondarynav={[
                {
                    name: "To Do List",
                    to: "/todolist",
                },
                {
                    name: "Create Task",
                    to: "/todolist/createtask",
                },
                {
                    name: "Folder",
                    to: "/todolist/folderpage",
                },
            ]}
        >
            <Heading as="h2" size="3xl" noOfLines={1}>
                Create Task
            </Heading>
        </AppBody>
    )
}

export default createtask
