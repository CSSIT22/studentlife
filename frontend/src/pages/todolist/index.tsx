import React, { useEffect, useState } from "react"
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
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
  ButtonGroup,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Progress,
} from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import { ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import axios from "axios"
import API from "src/function/API"
import { useNavigate } from "react-router-dom"

const index = () => {
  const [taskList, setTaskList] = useState([])
  const [folderList, setFolderList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // fetchTaskList();
    API.post("/todolist/listtask").then((res) => {
      setTaskList(res.data);
      console.log(res.data);
    })
  }, [])

  const sort = (sortName: string) => {
    API.post("/todolist/listtask", { orderBy: sortName }).then((res) => {
      setTaskList(res.data);
      console.log(res.data);
    })
  }

  const selectTask = (taskId: string) => {

  }

  return (
    <ToDoListAppBody>
      <Flex minWidth="max-content" alignItems="center" gap="2" flexDirection={["column", "row"]}>
        <Box p="2">
          <Heading size="2xl">To Do List</Heading>
        </Box>
        <Spacer />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sorting
          </MenuButton>
          <Button bg={"orange.200"} color={"white"} _hover={{ bgColor: "orange.100" }} onClick={() => {
            navigate({
              pathname: "/todolist/folderpage/",
            })
          }}>
            Folder
          </Button>
          <MenuList>
            <MenuItem onClick={() => sort("due")}>Due Date</MenuItem>
            <MenuItem onClick={() => sort("taskName")}>A-Z</MenuItem>
            <MenuItem onClick={() => sort("taskType")}>Type</MenuItem>
            <MenuItem onClick={() => sort("complete")}>Complete</MenuItem>
            <MenuItem onClick={() => sort("incomplete")}>Incomplete</MenuItem>

          </MenuList>
        </Menu>
      </Flex>

      {/* backend */}
      {
        taskList.map((el: any, index: number) => (

          <Box height={"6rem"} width={"100%"} p="5" mt="5"
            backgroundColor="#FFFFFF" rounded="lg" key={index} boxShadow="md" onClick={() => {
              navigate({
                pathname: "/todolist/task/" + el.taskId,
              })
            }} >
            <Flex alignItems={"center"}>
              <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} />
              <Text fontSize={"2xl"}>{el.taskCheck.taskName}</Text>
              <Spacer />

              <Spacer />
              {el.isCheck ? <Box textAlign={"right"} as="b" pr={"1rem"} color="green">Finished</Box>
                :
                new Date(el.taskCheck?.due) < new Date() ?
                  <Box textAlign={"right"} as="b" pr={"1rem"} color="red">Failed</Box> :
                  <Box textAlign={"right"} as="b" pr={"1rem"} color="gray">Not Finished</Box>
              }

            </Flex>
            <Box marginLeft={"7"} marginTop="0.5" color="gray">Type : {el.taskCheck.taskType}</Box>

          </Box>
        ))
      }

      <Box p="5" alignItems={"center"}>
        <Text fontSize={"2xl"} textAlign={"center"}>
          Work Progress
        </Text>
        {/* {taskList.filter((el: any) => (el.isCheck == true)).length / taskList.length} */}
        <Progress marginTop={2} value={taskList.filter((el: any) => (el.isCheck == true)).length / taskList.length * 100} size="lg" colorScheme="orange" />
      </Box>

    </ToDoListAppBody >
  )
}

export default index
