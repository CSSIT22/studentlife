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
import API from "src/function/API"
import { BrowserRouter as Router, Route, Link as RouteLink, Form, useNavigate } from "react-router-dom"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import { ArrowBackIcon } from "@chakra-ui/icons"

// const edittask = () => {
//     const { isOpen: isBackOpen, onOpen: onBackOpen, onClose: onBackClose } = useDisclosure()

const edittask = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("individual")
    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [due, setDueDate] = useState("")
    const [time, setTime] = useState("")
    const [folder, setFolder] = useState("")
    const [folderList, setFolderList] = useState([])
    const [editTask, setEditTask] = useState({})

    useEffect(() => {
        // fetchTaskList();
        API.post("/todolist/listfolder").then((res) => {
            setFolderList(res.data);
            console.log(res.data);
        })
    }, [])

    console.log(type)
    return (

        <ToDoListAppBody>
            <Heading as="h2" size="3xl" noOfLines={1}>
                <Box display="flex" justifyContent="left" alignItems="center">
                    <Link href="/todolist/task">
                        <Button bg={"orange.200"} color={"white"} _hover={{ bgColor: "orange.100" }}>
                            {/* onClick={onBackOpen} */}
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                </Box>
                Edit Task
            </Heading>
            <Box margin-top={10}>
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Task Name
                </Heading>
                <Input placeholder="Task Name" size="md" id="taskName" onChange={(e) => setTaskName(e.target.value)} />
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Description
                </Heading>
                <Input placeholder="Description" size="md" id="desc" onChange={(e) => setTaskDesc(e.target.value)} />
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Due Date
                </Heading>
                <label>
                    <input type="date" name="bday" required pattern="\d{4}/\d{2}/\d{2}" onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Time
                </Heading>
                <form>
                    <input id="appt-time" type="time" name="appt-time" onChange={(e) => setTime(e.target.value)} />
                </form>

                {/* <Heading as="h2" size="md" noOfLines={1} marginY={10}>
                    Type
                </Heading>
                <Select placeholder="Choose" size="md">
                    <option value="option1">Individual</option>
                    <option value="option2">Group</option>
                </Select> */}
                <Heading className="Type" as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Type
                </Heading>
                <Select placeholder="Choose" size="md" className="Type" onChange={(e) => setType(e.target.value)}>
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                </Select>

                {/* <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Alert
                </Heading>
                <Select placeholder="Choose" size="md">
                    <option value="option1">1 day before due date</option>
                    <option value="option1">3 days before due date</option>
                    <option value="option1">7 days before due date</option>
            </Select> */}

                {/* <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>
                    <Button colorScheme="teal" size="lg" bgColor={"orange.500"}>
                        <Link href="/todolist">Finish</Link>
                    </Button>
                </Box> */}
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Folder
                </Heading>
                <Select placeholder="Choose" size="md" onChange={(e) => setFolder(e.target.value)}>
                    {
                        folderList.map((el: any) => (
                            <option value={el.folderId}>{el.folderName}</option>
                        ))
                    }
                </Select>

                <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>
                    {type == "individual" ? (
                        <Button bg={"orange.200"} size="lg" color={"white"} _hover={{ bgColor: "orange.100" }}>
                            <Link href="/todolist/task">Done</Link>
                        </Button>
                    ) : (
                        <Button bg={"orange.200"} size="lg" color={"white"} _hover={{ bgColor: "orange.100" }}>
                            <Link href="/todolist/creategroup">Next</Link>
                        </Button>
                    )}
                </Box>
            </Box>
        </ToDoListAppBody>
    )
    // }
}
export default edittask
