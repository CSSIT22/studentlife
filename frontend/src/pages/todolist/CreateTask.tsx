import React, { useState } from "react"
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
import { BrowserRouter as Router, Route, Link as RouteLink, Form } from "react-router-dom"
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

const createtask = () => {
    const [type, setType] = useState("individual")
    console.log(type)

    return (
        <ToDoListAppBody>
            <Heading as="h1" size="3xl" noOfLines={1}>
                Create Task
            </Heading>

            <Box margin-top={10}>
                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Task Name
                </Heading>
                <Input placeholder="Task Name" size="md" id="taskName" />

                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Description
                </Heading>
                <Input placeholder="Description" size="md" id="desc" />

                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Due Date
                </Heading>
                <label>
                    <input type="date" name="bday" required pattern="\d{4}/\d{2}/\d{2}" />
                </label>

                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Time
                </Heading>
                <form>
                    <input id="appt-time" type="time" name="appt-time" />
                </form>

                <Heading className="Type" as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Type
                </Heading>
                <Select placeholder="Choose" size="md" className="Type" onChange={(e) => setType(e.target.value)}>
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                </Select>

                <Heading as="h2" size="md" noOfLines={1} mt={8} mb={2}>
                    Alert
                </Heading>
                <Select placeholder="Choose" size="md">
                    <option value="option1">1 day before due date</option>
                    <option value="option1">3 days before due date</option>
                    <option value="option1">7 days before due date</option>
                </Select>

                <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>
                    {type == "individual" ? (
                        <Button colorScheme="teal" size="lg" id="submit" bgColor={"orange.500"}>
                            <Link href="/todolist/task">Done</Link>
                        </Button>
                    ) : (
                        <Button colorScheme="teal" size="lg" bgColor={"orange.500"}>
                            <Link href="/todolist/creategroup">Next</Link>
                        </Button>
                    )}
                </Box>
            </Box>
        </ToDoListAppBody>
    )
}

export default createtask