import { ChevronDownIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Flex, Heading, Link, Text, Spacer, Menu, MenuButton, Button, MenuList, MenuItem, Progress, Box } from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import API from "src/function/API"

const insidefolder = () => {
  const [taskList, setTaskList] = useState([])
  const navigate = useNavigate()
  const [folderList, setFolderList] = useState([])
  const [fdName, setFdName] = useState<any>({})

  let { folderid } = useParams()

  // useEffect(() => {
  //   axios.post("http://localhost:8000/todolist/listfolder").then((res) => {
  //     setFolderList(res.data);
  //   })
  // }, [])

  useEffect(() => {
    // fetchTaskList();
    console.log("ok kub");
    console.log(folderid);

    API.post("/todolist/listtaskinfolder", {
      folderId: folderid,
    }).then((res) => {
      setTaskList(res.data.tasks);
      console.log("success", res.data);
    })
  }, [])

  const sort = (sortName: string) => {
    API.post("/todolist/listtaskinfolder", { orderBy: sortName }).then((res) => {
      setTaskList(res.data.tasks);
      console.log(res.data);
    })
  }

  return (
    <ToDoListAppBody>
      <Flex alignItems="self-end" gap="2" flexDirection={["column", "row"]}>
        <Heading as="h2" size="xl" noOfLines={1} >
          asdasd
        </Heading>
        <Spacer />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sorting
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => sort("due")}>Due Date</MenuItem>
            <MenuItem onClick={() => sort("taskName")}>A-Z</MenuItem>
            <MenuItem onClick={() => sort("complete")}>Complete</MenuItem>
            <MenuItem onClick={() => sort("incomplete")}>Incomplete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {
        taskList.map((el: any, index: number) => (

          <Box height={"5rem"} width={"100%"} p="5" mt="5"
            backgroundColor="#FFFFFF" rounded="lg" key={index} boxShadow="md" onClick={() => {
              navigate({
                pathname: "/todolist/task/" + el.folderId,
              })
            }} >
            <Text>{el.taskName}</Text>
            <Flex alignItems={"center"}>
              <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} />
              <Text fontSize={"2xl"}>{fdName.folderName}</Text>
              <Spacer />
              {el.checkTask.isCheck ? <Box textAlign={"right"} as="b" pr={"1rem"} color="green">Finished</Box> : <Box textAlign={"right"} as="b" pr={"1rem"} color="red">Not Finished</Box>}
            </Flex>
          </Box>
        ))
      }
    </ToDoListAppBody>
  )
}

export default insidefolder
