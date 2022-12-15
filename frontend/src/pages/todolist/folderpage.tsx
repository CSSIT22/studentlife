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
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import AppBody from "src/components/share/app/AppBody"
import { AddIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { AiFillFolder } from "react-icons/ai"
import axios from "axios"
import { IconContext } from "react-icons"
import API from "src/function/API"
import { Navigate, useNavigate } from "react-router-dom"

const folderpage = () => {
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const navigate = useNavigate()
  const [folderList, setFolderList] = useState([])
  const [newFolderName, setNewFolderName] = useState("")

  useEffect(() => {
    console.log("log")
    axios.post("http://localhost:8000/todolist/listfolder").then((res) => {
      setFolderList(res.data);
    })
  }, [])

  const createFolder = () => {
    API.post("/todolist/createfolder", {
      folderName: newFolderName
    }).then(() => {
      //navigate("/todolist/folderpage")
    })
  }

  return (
    <ToDoListAppBody>
      <Heading as="h1" size="3xl">
        Folder Page
      </Heading>
      <Box display="flex" justifyContent="end" alignItems="center" marginY={10}>
        <Button bgColor="orange.200" onClick={onCreateOpen}>
          <AddIcon />
        </Button>
      </Box>

      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as="h2" size="ms" noOfLines={1} display="flex" alignItems="center">
              <AiFillFolder />
              Folder Name
            </Heading>
            <Input placeholder="Folder Name" size="md" onChange={(name) => setNewFolderName(name.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCreateClose}>
              Close
            </Button>
            <Link href="/todolist/folderpage">
              <Button colorScheme="blue" onClick={createFolder}>Done</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* backend */}
      {
        folderList.map((el: any) => (
          <Box height={"30%"} width={"-webkit-fit-content"} p="5" mt="5"
            display={"flex"} alignItems={"center"} marginLeft="150" marginTop={"-15"} itemProp={"2"}>
            <Box as="h2" noOfLines={1} display="flex" alignItems="center" key={el.folderId} flexDirection="column" onClick={() => {
              navigate({
                pathname: "/todolist/insidefolder/" + el.folderId,
              })
            }}>
              <IconContext.Provider value={{ size: '100' }}>
                <AiFillFolder />
              </IconContext.Provider>
              <Text alignItems={"center"} fontSize={"2xl"}>{el.folderName}</Text>
            </Box>
            <Spacer />
          </Box>
        ))
      }
    </ToDoListAppBody >
  )
}

export default folderpage
