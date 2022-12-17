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
    Editable,
    EditablePreview,
    EditableInput,
} from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import API from "src/function/API"
import { BrowserRouter as Router, Route, Link as RouteLink, Form, useNavigate, useParams } from "react-router-dom"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import { ArrowBackIcon } from "@chakra-ui/icons"
import dayjs from "dayjs"
import task from "../task"

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
    const [folderName, setFolderName] = useState("")
    const [folderList, setFolderList] = useState([])
    const [descList, setDescList] = useState<any>({})

    let { taskid } = useParams()

    useEffect(() => {
        // fetchTaskList();
        API.post("/todolist/detail", { taskId: taskid }).then((res) => {
            setDescList(res.data);
            setTaskName(res.data.taskCheck?.taskName);
            setTaskDesc(res.data.taskCheck?.taskDesc);
            setFolder(res.data.taskCheck?.folderId);
            // console.log(taskName);

            console.log("grrrr", res.data);
        })

        API.post("/todolist/listfolder").then((res) => {
            setFolderList(res.data);
            console.log(res.data);
        })
    }, [])

    const submit = (taskId: string) => {
        API.post("/todolist/edittask", {
            taskId: taskId,
            taskName: taskName,
            taskDesc: taskDesc,
            due: new Date(due + "T" + time + "Z"),
            taskType: type,
            // alert: alert,
            folderId: folder
        }).then(() => {
            navigate("/todolist/")
        })
    }

    // const ChangeName = (e: any) => {

    //     setTaskName(e)
    //     console.log(taskName);
    // }

    // const editTask = (taskId: string) => {
    //     API.post("/todolist/editTask", { taskId: taskid }).then((res) => {
    //         console.log(res.data);
    //     })
    // }

    // console.log(type)

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
                {/* <Text size="md">{descList.taskName}</Text> */}
                {/* <Editable defaultValue='something'>
                    <EditablePreview /> */}
                <Input placeholder={descList.taskCheck?.taskName} size="md" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                {/* </Editable> */}
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Description
                </Heading>
                {/* <Text size="md">{descList.taskDesc}</Text> */}
                <Input placeholder={descList.taskCheck?.taskDesc} size="md" id="desc" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Due Date
                </Heading>
                <Text fontSize="md">{dayjs(descList.taskCheck?.due).format("dddd DD MMMM YYYY")}</Text>
                {/* value={dayjs(descList.due).format("YYYY-MM-DD")} */}
                <label>
                    <input type="date" name="bday" required pattern="\d{4}/\d{2}/\d{2}" onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Time
                </Heading>
                <Text fontSize="md">{dayjs(descList.taskCheck?.due).format("HH:mm:ss")}</Text>
                {/* value={dayjs(descList.due).format("HH:mm")} */}
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
                {/* <Text size="md">{descList.taskType}</Text> */}
                <Select placeholder={descList.taskCheck?.taskType} value={folder} size="md" className="Type" onChange={(e) => setType(e.target.value)}>
                    {
                        descList.taskCheck?.taskType == "individual" ? <option value="group">Group</option> :
                            <option value="individual">Individual</option>
                    }


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

                <Select placeholder={descList.taskCheck?.folderName} size="md" onChange={(e) => setFolder(e.target.value)}>
                    {
                        folderList.map((el: any) => (
                            <option value={el.folderId}>{el.folderName}</option>
                        ))
                    }
                </Select>

                <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>

                    <Button bg={"orange.200"} size="lg" color={"white"} _hover={{ bgColor: "orange.100" }}>
                        <Link onClick={() => {
                            submit(descList.taskCheck?.taskId)
                        }}>Done</Link>
                    </Button>
                </Box>
            </Box>
        </ToDoListAppBody>
    )
    // }
}
export default edittask
