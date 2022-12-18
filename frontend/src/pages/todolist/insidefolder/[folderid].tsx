import { ChevronDownIcon, ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons"
import { Flex, Heading, Link, Text, Spacer, Menu, MenuButton, Button, MenuList, MenuItem, Progress, Box, useDisclosure, ModalCloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, VStack, Toast, useToast } from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import API from "src/function/API"

const insidefolder = () => {
  const [taskList, setTaskList] = useState<any>({})
  const navigate = useNavigate()
  const [folderList, setFolderList] = useState([])
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  let { folderid } = useParams()
  const toast = useToast()

  useEffect(() => {
    // fetchTaskList();
    // console.log("ok");
    // console.log(folderid);

    API.post("/todolist/listtaskinfolder", {
      folderId: folderid,
    }).then((res) => {
      console.log(res.data.tasks);
      setTaskList(res.data);
      // console.log("success", res.data);
      console.log(taskList);
      console.log("data");

    })
  }, [])

  const deleteFolder = () => {
    API.post("/todolist/deleteFolder", { folderId: folderid }).then((res) => {
      console.log("complete", res.data);
      navigate({
        pathname: "/todolist/folderpage",
      })
    })
  }

  const sort = (sortName: string) => {
    API.post("/todolist/listtaskinfolder", {
      orderBy: sortName,
      folderId: folderid
    }).then((res) => {
      setTaskList(res.data);
      console.log(res.data);
    })
  }

  return (
    <ToDoListAppBody>
      <Flex minWidth="max-content" flexWrap="wrap" alignItems="center" gap="2" flexDirection={["column", "row"]}>
        <Box p="2">
          <Heading size="2xl"  >
            {taskList.folderInfo?.folderName}
          </Heading>
        </Box>

        {/* each button */}
        <Heading></Heading>
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
          <Button bg={"orange.200"} color={"white"} _hover={{ bgColor: "orange.100" }} onClick={onDeleteOpen}>
            Delete
          </Button>
        </Menu>
      </Flex>

      {/* delete folder */}
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
              deleteFolder()
              toast({
                title: 'Folder Deleted.',
                description: "Folder " + taskList.folderInfo?.folderName + " deleted successfully.",
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

      {/* list each task list in folder */}
      {taskList.tasks?.map((el: any, index: number) => (
        <Box height={"6rem"} width={"100%"} p="5" mt="5"
          backgroundColor="#FFFFFF" rounded="lg" boxShadow="md" key={index} onClick={() => {
            navigate({
              pathname: "/todolist/task/" + el.taskId,
            })
          }} >
          <Flex alignItems={"center"}>
            <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} />
            <Text fontSize={"2xl"}>{el.taskCheck?.taskName}</Text>
            <Spacer />
            {/* {el.isCheck ? <Box textAlign={"right"} as="b" pr={"1rem"} color="green">Finished</Box> : <Box textAlign={"right"} as="b" pr={"1rem"} color="red">Not Finished</Box>} */}

            {el.isCheck ? <Box textAlign={"right"} as="b" pr={"1rem"} color="green">Finished</Box>
              :
              new Date(el.taskCheck?.due) < new Date() ?
                <Box textAlign={"right"} as="b" pr={"1rem"} color="red">Failed</Box> :
                <Box textAlign={"right"} as="b" pr={"1rem"} color="gray">Not Finished</Box>
            }
          </Flex>
          {/* <Text>{el.isCheck.toString()}</Text> */}
          <Box marginLeft={"7"} marginTop="0.5" color="gray">Type : {el.taskCheck?.taskType}</Box>
        </Box>
      ))
      }
    </ToDoListAppBody >
  )
}

export default insidefolder
