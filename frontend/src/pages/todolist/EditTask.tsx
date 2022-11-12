import React from "react"
import {
    Icon,
    IconButton,
    Skeleton,
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
import { ArrowBackIcon } from "@chakra-ui/icons"

const edittask = () => {
    const { isOpen: isBackOpen, onOpen: onBackOpen, onClose: onBackClose } = useDisclosure()

    return (
        <ToDoListAppBody>
            <Heading as="h2" size="3xl" noOfLines={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button bgColor="orange.200" onClick={onBackOpen}>
                        <Link href="/todolist">
                            <ArrowBackIcon />
                        </Link>
                    </Button>
                </Box>
                Edit Task
            </Heading>
            <Box margin-top={10}>
                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Task Name
                </Heading>
                <Text fontSize="sm">Name of Task.</Text>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Description
                </Heading>
                <Text fontSize="sm">Description of Task.</Text>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Due Date
                </Heading>
                {/* <Input placeholder="Select Date and Time" size="md" type="datetime-local" /> */}
                <Text fontSize="sm">Due Date of Task.</Text>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Time
                </Heading>
                <Text fontSize="sm">Time of Task.</Text>

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
                        Finish
                    </Button>
                </Box>
            </Box>
        </ToDoListAppBody>
    )
}

export default edittask
