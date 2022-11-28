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

const index = () => {
  const [taskList, setTaskList] = useState([])

  // const fetchTaskList = async () => {
  //     const res = await axios.get("http://localhost:8000/todolist/listtask", {
  //         withCredentials: true,
  //     })
  //     console.log('data', res.data);
  //     setTaskList(res.data);
  // }

  useEffect(() => {
    // fetchTaskList();
    axios.get("http://localhost:8000/todolist/listtask").then((res) => {
      setTaskList(res.data);
    })
  }, [])

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
          <Button colorScheme="orange">
            <Link href="/todolist/folderpage">Folder</Link>
          </Button>
          <MenuList>
            <MenuItem>Due Date</MenuItem>
            <MenuItem>A-Z</MenuItem>
            <MenuItem>Complete</MenuItem>
            <MenuItem>Incomplete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* backend */}
      {
        taskList.map((el: any) => (
          <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#ECECEC" rounded="lg" key={el.taskId}>

            <Flex alignItems={"center"}>
              <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} />
              <Box>
                <Text fontSize={"2xl"}>{el.taskName}</Text>
              </Box>
              <Spacer />
              <Box textAlign={"right"} as="b" pr={"1rem"} color="green">
                {el.isChecked && "Finished"}
              </Box>
            </Flex>
          </Box>
        ))
      }

      <Box p="5" alignItems={"center"}>
        <Text fontSize={"2xl"} textAlign={"center"}>
          Work Progress
        </Text>
        <Progress marginTop={2} value={20} size="lg" colorScheme="orange" />
      </Box>

    </ToDoListAppBody >
  )
}

export default index
