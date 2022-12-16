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
    IconButton,
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
import { AddIcon } from "@chakra-ui/icons"
import AppBody from "src/components/share/app/AppBody"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import { useControllableProp, useControllableState } from "@chakra-ui/react"
import API from "src/function/API"

// const [isControlled, value] = useControllableProp(propValue, stateValue){
// function Example() {
//   const [value, setValue] = useControllableState({ defaultValue: 40 })
//   return (
//     <div>
//       <Button onClick={() => setValue(value + 1)}>+</Button>
//       <Box as='span' w='200px' mx='24px'>
//         {value}
//       </Box>
//       <Button onClick={() => setValue(value - 1)}>-</Button>
//     </div>
//   )
// }}
const [userList, setUserList] = useState([])


const fetchData = () => {
    API.post("http://localhost:8000/todolist/listnamefromid").then((res) => {
        setUserList(res.data);
    })
}

const creategroup = () => {
    const [members, setMembers] = useState([
        {
            uid: "",
            name: "",
        },
        {
            uid: "",
            name: "",
        },
    ])

    const addRow = () => {
        setMembers((members) => [
            ...members,
            {
                uid: "",
                name: "",
            },
        ])
    }

    return (
        <ToDoListAppBody>
            <Heading as="h1" size="3xl" noOfLines={1}>
                Create Group
            </Heading>

            <Box margin-top={10}>
                <Heading as="h2" size="md" noOfLines={1} marginY={10} marginInline={5}>
                    Members
                </Heading>

                {members.map((member, index) => (
                    <Box display="flex" flexWrap={"wrap"} marginY={10}>
                        {index + 1}.
                        <Input variant="flushed" placeholder="Insert UID" ml={4} flex={1} value={member.uid} />
                        <Input variant="flushed" placeholder="Member Name" ml={4} flex={1} />
                    </Box>
                ))}

                <IconButton bgColor={"grey.900"} aria-label="AddIcon" padding="20px" marginX="5px" icon={<AddIcon />} onClick={addRow} />

                <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>
                    <Button colorScheme="teal" size="lg" bgColor={"orange.500"}>
                        <Link href="/todolist/task">Done</Link>
                    </Button>
                </Box>
            </Box>
        </ToDoListAppBody>
    )
}

export default creategroup
