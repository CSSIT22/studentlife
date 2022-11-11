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
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Button,
    ButtonGroup,
    Image,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
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
import { EditIcon } from "@chakra-ui/icons"
import { DeleteIcon } from "@chakra-ui/icons"
import { CheckIcon } from "@chakra-ui/icons"

const task = () => {
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const { isOpen: isCheckOpen, onOpen: onCheckOpen, onClose: onCheckClose } = useDisclosure()

    return (
        <ToDoListAppBody>
            <Heading as="h2" size="3xl" noOfLines={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <IconButton bgColor={"orange.200"} aria-label="Go Back" padding="20px" marginX="5px" icon={<ArrowBackIcon />} />
                    <IconButton bgColor={"orange.200"} aria-label="Edit" padding="20px" icon={<EditIcon />} />
                </Box>
                CSC210 : Work 1
            </Heading>
            <Box margin-top={10}>
                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Description
                </Heading>
                <Text fontSize="sm">
                    Exercise 1.1 Question 6 and 12. <br />
                    Exercise 1.2 Question 2, 5 and 9. <br />
                </Text>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
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
                <Select placeholder="Individaul" size="md"></Select>

                <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Alert
                </Heading>
                <Select placeholder="3 days before due date" size="md"></Select>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginY={10}>
                    <Button onClick={onDeleteOpen} bgColor="orange.200" width="40px" h="40px">
                        <DeleteIcon />
                    </Button>
                    <Button onClick={onCheckOpen} bgColor="orange.200" width="40px" h="40px">
                        <CheckIcon />
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>
                    <Button colorScheme="teal" size="lg" bgColor={"orange.500"}>
                        Finish
                    </Button>
                </Box>
            </Box>

            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
                <ModalOverlay />
                <ModalContent textAlign={"center"}>
                    <ModalHeader fontWeight="800" fontSize={"35px"}>
                        !! Warning !!
                    </ModalHeader>
                    <VStack spacing={3} pt="30px">
                        <Text fontSize={"20px"} fontWeight="500">
                            Do you want to delete ?
                        </Text>
                    </VStack>
                    <ModalCloseButton />
                    <ModalFooter justifyContent={"center"} pt="60px">
                        <Button colorScheme="red" mr={3} onClick={onDeleteClose}>
                            No
                        </Button>
                        <Button colorScheme="green" mr={3} onClick={onDeleteClose}>
                            Yes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isCheckOpen} onClose={onCheckClose} isCentered>
                <ModalOverlay />
                <ModalContent textAlign={"center"}>
                    <ModalHeader fontWeight="800" fontSize={"35px"}>
                        !! Warning !!
                    </ModalHeader>
                    <VStack spacing={3} pt="30px">
                        <Text fontSize={"20px"} fontWeight="500">
                            Do you want to check ?
                        </Text>
                    </VStack>
                    <ModalCloseButton />
                    <ModalFooter justifyContent={"center"} pt="60px">
                        <Button colorScheme="red" mr={3} onClick={onCheckClose}>
                            No
                        </Button>
                        <Button colorScheme="green" mr={3} onClick={onCheckClose}>
                            Yes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ToDoListAppBody>
    )
}

export default task
