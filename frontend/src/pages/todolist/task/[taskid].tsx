import React, { useEffect, useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Button,
    Heading,
    Box,
    StackDivider,
    VStack,
    GridItem,
    Flex,
    Text,
    Link,
    useToast,
    ModalBody,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { EditIcon } from "@chakra-ui/icons"
import { DeleteIcon } from "@chakra-ui/icons"
import { BellIcon } from "@chakra-ui/icons"
import { CheckIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import { AiFillFolder } from "react-icons/ai"

const task = () => {
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const { isOpen: isCheckOpen, onOpen: onCheckOpen, onClose: onCheckClose } = useDisclosure()
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
    const { isOpen: isBackOpen, onOpen: onBackOpen, onClose: onBackClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
    const { isOpen: isNotiOpen, onOpen: onNotiOpen, onClose: onNotiClose } = useDisclosure()
    const [descList, setDescList] = useState<any>({})
    const navigate = useNavigate()
    const [studentId, setStudentId] = useState("")
    const [userId, setUserId] = useState("")

    // const location = useLocation()
    // console.log(location.state.taskId);

    let { taskid } = useParams()

    const toast = useToast()
    const isError = studentId === ''
    const currentDate = new Date()
    const targetDate = new Date(descList.taskCheck?.due)
    const min = 1000 * 0
    const hour = min * 60
    const day = hour * 24
    const one_day = 1000 * 60 * 60 * 24;
    const dayleft = Math.ceil((targetDate.getTime() - currentDate.getTime()) / (one_day))
    console.log(dayleft);

    // console.log(location.task);

    useEffect(() => {
        // fetchTaskList();
        console.log("hyyhyt");

        API.post("/todolist/detail", { taskId: taskid }).then((res) => {
            setDescList(res.data);
            setUserId(res.data.userId);
            console.log("grrrr", res.data);
        })
    }, [])

    const deleteTask = (taskId: string) => {
        API.post("/todolist/deleteTask", { taskId: taskId }).then((res) => {
            console.log(res.data);
        }).then(() => {
            navigate({
                pathname: "/todolist/",
            })
        })
    }

    const finishTask = (taskId: string) => {
        API.post("/todolist/finishtask", { taskId: taskId }).then((res) => {
            console.log(res.data)
        }).then(() => {
            navigate({
                pathname: "/todolist/"
            })
        })

    }

    const addMemberToTask = () => {
        API.post("/todolist/addmembertotask", {
            studentId: studentId,
            taskId: descList.taskCheck?.taskId
        }).then((res) => {
            console.log(res.data)
        }).then(() => {
            navigate({
                pathname: "/todolist/"
            })
        })

    }

    const setNoti = () => {
        API.post("/notification/addnotiobject", {
            template: "TODO_LIST_TASK",
            value: [descList.taskCheck?.taskName, " ", dayleft.toString()],
            userId: [userId],
            module: "TODO_LIST",
            url: "/todolist/",
            sender: userId
        })
            .then(() => {
                navigate("/todolist/")
            })
    }


    return (
        <ToDoListAppBody>

            <Heading as="h2" size="xl" noOfLines={1} >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button bgColor="orange.200" color={"white"} onClick={() => {
                        navigate({
                            pathname: "/todolist/",
                        })
                    }}>

                        <ArrowBackIcon />

                    </Button>
                    <Box display="flex" gap={3}>
                        <Button onClick={onNotiOpen} marginLeft={"5"} color={"white"} bgColor="orange.200" width="40px" h="40px">
                            <BellIcon />
                        </Button>
                        <Modal isOpen={isNotiOpen} onClose={onNotiClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader fontWeight="800" fontSize={"35px"}>
                                    Setting up Notification
                                </ModalHeader>
                                <VStack spacing={3} pt="30px">
                                    <Text fontSize={"20px"} fontWeight="500">
                                        Do you want set Notification for this task?
                                    </Text>
                                </VStack>
                                <ModalCloseButton />
                                <ModalFooter justifyContent={"center"} pt="60px">
                                    <Button colorScheme="red" mr={3} onClick={onNotiClose}>
                                        No
                                    </Button>
                                    <Button colorScheme="green" mr={3} onClick={() => {
                                        onNotiClose()
                                        setNoti()
                                        toast({
                                            title: 'Notification Added.',
                                            description: "Task " + descList.taskCheck?.taskName + " notified successfully.",
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        })

                                    }}>
                                        Yes
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Button bgColor="orange.200" color={"white"} onClick={() => {
                            onEditOpen()
                            navigate({
                                pathname: "/todolist/edittask/" + descList.taskId,
                            })
                        }}>
                            <EditIcon />

                        </Button>
                    </Box>
                </Box>
            </Heading>
            <Box margin-top={10}>
                <Heading as="h2" size="xl" noOfLines={1} >
                    {descList.taskCheck?.taskName}
                </Heading>
                <Heading as="h2" size="md" mt={8} mb={2}>
                    Description
                </Heading>
                <Box bg='#D9D9D9' borderRadius='md' w='100%' p={4} color='black'>
                    <Text fontSize="md">
                        <Text as="h2" size="md">{descList.taskCheck?.taskDesc}</Text>
                    </Text>
                </Box>
                <Heading as="h2" size="md" mt={8} mb={2}>
                    Due Date
                </Heading>
                {/* <Input placeholder="Select Date and Time" size="md" type="datetime-local" /> */}
                <Box bg='#D9D9D9' borderRadius='md' w='100%' p={4} color='black'>
                    <Text fontSize="md">{dayjs(descList.taskCheck?.due).format("dddd DD MMMM YYYY")}</Text>
                </Box>
                <Heading as="h2" size="md" mt={8} mb={2}>
                    Time
                </Heading>
                <Box bg='#D9D9D9' borderRadius='md' w='100%' p={4} color='black'>
                    <Text fontSize="md">{dayjs(descList.taskCheck?.due).format("HH:mm:ss")}</Text>
                </Box>
                <Heading as="h2" size="md" mt={8} mb={2}>
                    Type
                </Heading>
                <Box bg='#D9D9D9' borderRadius='md' w='100%' p={4} color='black'>
                    <Text fontSize="md">{descList.taskCheck?.taskType}</Text>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" marginY={10}>
                    <Button onClick={onDeleteOpen} color={"white"} bgColor="orange.200" width="40px" h="40px">
                        <DeleteIcon />
                    </Button>

                    <Button bgColor="orange.200" onClick={() => {

                        if (descList.taskCheck?.taskType == 'group') {
                            onAddOpen()
                        } else {
                            toast({
                                title: 'Failed.',
                                description: "You can't add member into Individual task type.",
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            })
                        }


                    }}>
                        Add Member
                    </Button>
                    <Button onClick={onCheckOpen} color={"white"} bgColor="orange.200" width="40px" h="40px">
                        <CheckIcon />
                    </Button>
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
                            <Button colorScheme="green" mr={3} onClick={() => {
                                onDeleteClose()
                                deleteTask(descList.taskCheck?.taskId)
                                toast({
                                    title: 'Task Deleted.',
                                    description: "Task " + descList.taskCheck?.taskName + " deleted successfully.",
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                })

                            }}>
                                Yes
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>


                <Modal isOpen={isAddOpen} onClose={onAddClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Member to Task</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired isInvalid={isError}>
                                <Heading as="h2" size="ms" noOfLines={1} display="flex" alignItems="center">
                                    <FormLabel marginLeft={2}>Please fill Student ID in the box</FormLabel>
                                </Heading>
                                <Input placeholder="Student ID" size="md" onChange={(e: any) => setStudentId(e.target.value)} />
                                {!isError ? (
                                    <></>
                                ) : (
                                    <FormErrorMessage>Student ID is required.</FormErrorMessage>
                                )}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onAddClose}>
                                Close
                            </Button>
                            {/* <Link href="/todolist/folderpage"> */}
                            <Button colorScheme="blue" onClick={() => {
                                addMemberToTask()
                                toast({
                                    title: 'Member Added.',
                                    description: "Student ID " + studentId + " has been added to task successfully.",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                })
                            }}>Done</Button>
                            {/* </Link> */}
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* add Notification */}





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
                            <Button colorScheme="green" mr={3} onClick={() => {
                                onCheckClose()
                                finishTask(descList.taskCheck?.taskId)
                                console.log(descList)
                                if (descList.isCheck == false) {

                                    toast({
                                        title: 'Task Checked.',
                                        description: "Task " + descList.taskCheck?.taskName + " has been checked successfully.",
                                        status: 'success',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                } else {
                                    toast({
                                        title: 'Task Unchecked.',
                                        description: "Task " + descList.taskCheck?.taskName + " has been unchecked successfully.",
                                        status: 'error',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                }

                            }}>
                                Yes
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </ToDoListAppBody >
    )
}



export default task
