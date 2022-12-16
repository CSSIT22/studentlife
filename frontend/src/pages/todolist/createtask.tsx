import React, { useEffect, useState } from "react"
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
    FormControl,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react"
import API from "src/function/API"
import { BrowserRouter as Router, Route, Link as RouteLink, Form, useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"

// const creTask = document.getElementById("btn")! as HTMLButtonElement
// const inputEl = document.getElementById("input")! as HTMLInputElement
// const listEl = document.getElementById("list")!
// const submitBtn = document.getElementById("submit")!

// submitBtn.addEventListener("click", () => {})

// const [taskName, setTaskName] = React.useState(String)

// const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
//     // Preventing the page from reloading
//     event.preventDefault()
//     console.log(document.getElementById("taskName"))
//     console.log(document.getElementById("desc"))
// }

// function saveData(e: SubmitEvent) {
//     e.preventDefault()
//     const taskName = inputEl.value
//     createList(taskName)
// }

// function createList(text: string) {
//     const liEl = document.createElement("li")
//     liEl.append(text)
//     listEl.append(liEl)
//     inputEl.value = ""
// }

// const [taskName, setTaskName] = useState("")
// const [taskDesc, setTaskDesc] = useState("")

const createtask = () => {
    //const [type, setType] = useState("individual")
    //console.log(type)
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [due, setDueDate] = useState("")
    const [time, setTime] = useState("")
    const [type, setType] = useState("")
    // const [alert, setAlert] = useState("")
    const [folder, setFolder] = useState("")
    const [folderList, setFolderList] = useState([])

    const isError = taskName === ''

    const toast = useToast()
    const submit = () => {
        if (taskName == '') {
            console.log("");
        } else {
            API.post("/todolist/createtask", {
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

    }

    useEffect(() => {
        // fetchTaskList();
        API.post("/todolist/listfolder").then((res) => {
            setFolderList(res.data);
            console.log(res.data);
        })
    }, [])



    return (
        <ToDoListAppBody>
            <Heading as="h1" size="3xl" noOfLines={1}>
                Create Task
            </Heading>

            <Box margin-top={10}>
                <FormControl isRequired isInvalid={isError}>
                    <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                        Task Name
                    </Heading>
                    <Input placeholder="Task Name" size="md" id="taskName" onChange={(e) => setTaskName(e.target.value)} />
                    {/* //value={taskName} onChange={(e) => setTaskName(e.target.value)} */}
                    {!isError ? (
                        <></>
                    ) : (
                        <FormErrorMessage>Task Name is required.</FormErrorMessage>
                    )}
                </FormControl>

                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Description
                </Heading>
                <Input placeholder="Description" size="md" id="desc" onChange={(e) => setTaskDesc(e.target.value)} />
                {/* // value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} */}

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

                <Heading className="Type" as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Type
                </Heading>
                <Select placeholder="Choose" size="md" className="Type" onChange={(e) => setType(e.target.value)}>
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                </Select>

                {/* <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Alert
                </Heading> */}
                {/* <Select placeholder="Choose" size="md" onChange={(e) => console.log(e.target.value)}>
                    <option value="option1">1 day before due date</option>
                    <option value="option2">3 days before due date</option>
                    <option value="option3">7 days before due date</option>
                </Select> */}
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
                            <Link onClick={() => {
                                submit()
                                toast({
                                    title: 'Task Created.',
                                    description: "Task " + taskName + " created successfully.",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                })
                            }}>Done</Link>
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

}


export default createtask
