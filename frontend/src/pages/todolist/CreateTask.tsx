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
        <ToDoListAppBody>
            <Heading as="h1" size="3xl" noOfLines={1}>
                Create Task
            </Heading>

            <Box margin-top={10}>
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Task Name
                </Heading>
                <Input placeholder="Task Name" size="md" />

                <Heading as="h2" size="md" noOfLines={1} marginY={10} marginInline={5}>
                    Description
                </Heading>
                <Input placeholder="Descrription" size="md" />

                <Heading as="h2" size="md" noOfLines={1} marginY={2} marginInline={5}>
                    Due Date
                </Heading>
                {/* <Input placeholder="Select Date and Time" size="md" type="datetime-local" /> */}
                <label>
                    <input type="date" name="bday" required pattern="\d{4}/\d{2}/\d{2}" />
                </label>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Time
                </Heading>
                <form>
                    <input id="appt-time" type="time" name="appt-time" />
                </form>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Type
                </Heading>
                <Select placeholder="Choose" size="md">
                    <option value="option1">Individual</option>
                    <option value="option2">Group</option>
                </Select>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Alert
                </Heading>
                <Select placeholder="Choose" size="md">
                    <option value="option1">1 day before due date</option>
                    <option value="option1">3 days before due date</option>
                    <option value="option1">7 days before due date</option>
                </Select>

                <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>
                    <Button colorScheme="teal" size="lg" bgColor={"orange.500"}>
                        Done
                    </Button>
                </Box>
            </Box>
        </ToDoListAppBody>
    )
}

export default createtask
