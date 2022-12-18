import React, { useEffect, useState } from "react"
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
import axios from "axios"
import API from "src/function/API"

const task = () => {
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const { isOpen: isCheckOpen, onOpen: onCheckOpen, onClose: onCheckClose } = useDisclosure()
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
    const { isOpen: isBackOpen, onOpen: onBackOpen, onClose: onBackClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const [descList, setDescList] = useState([])
    useEffect(() => {
        // fetchTaskList();
        API.post("/todolist/listtask").then((res) => {
            setDescList(res.data);
        })
    }, [])

    return (
        <ToDoListAppBody>
            <Heading as="h2" size="xl" noOfLines={1} >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Link href="/todolist">
                        <Button bg={"orange.200"} color={"white"} _hover={{ bgColor: "orange.100" }}>
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                    <Link href="/todolist/edittask">
                        <Button bg={"orange.200"} color={"white"} _hover={{ bgColor: "orange.100" }}>
                            <EditIcon />
                        </Button>
                    </Link>
                </Box>
                CSC210 : Work 1
            </Heading>

            <Box margin-top={10}>
                <Heading as="h2" size="md" mt={8} mb={2}>
                    Description
                </Heading>
                <Text fontSize="sm">
                    {
                        descList.map((el: any) => (
                            <Text as="h2" size="md">{el.taskDesc}</Text>
                        ))
                    }
                </Text>
                <Heading as="h2" size="md" mt={8} mb={2}>
                    Due Date
                </Heading>
                {/* <Input placeholder="Select Date and Time" size="md" type="datetime-local" /> */}
                <label>
                    <input type="date" name="bday" required pattern="\d{4}/\d{2}/\d{2}" />
                </label>
                <Heading as="h2" size="md" mt={8} mb={2}>
                    Time
                </Heading>
                <form>
                    <input id="appt-time" type="time" name="appt-time" />
                </form>

                <Heading as="h2" size="md" mt={8} mb={2}>
                    Type
                </Heading>
                <Select placeholder="Individaul" size="md"></Select>

                <Heading as="h2" size="md" mt={8} mb={2}>
                    Alert
                </Heading>
                <Select placeholder="3 days before due date" size="md"></Select>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginY={10}>
                    <Button bg={"orange.200"} color={"white"} _hover={{ bgColor: "orange.100" }}>
                        <DeleteIcon />
                    </Button>
                    <Button bg={"orange.200"} color={"white"} _hover={{ bgColor: "orange.100" }}>
                        <CheckIcon />
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
