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

const folderpage = () => {
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

  const [folderList, setFolderList] = useState([])

  // const fetchFolderList = async () => {
  //   const res = await axios.get("http://localhost:8000/todolist/listfolder", {
  //     withCredentials: true,
  //   })

  //   setFolderList(res.data);
  // }

  useEffect(() => {
    axios.get("http://localhost:8000/todolist/listfolder").then((res) => {
      setFolderList(res.data);
    })
  }, [])

  // useEffect(() => {
  //   fetchFolderList();
  // }, [])

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
            <Input placeholder="Folder Name" size="md" />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCreateClose}>
              Close
            </Button>
            <Button colorScheme="blue">Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* backend */}
      {
        folderList.map((el: any) => (
          <Box height={"5rem"} width={"100%"} p="5" mt="5"
            backgroundColor="#FFFFFF" rounded="lg" boxShadow="md">
            <Flex alignItems={"center"}>
              <Heading as="h2" size="ms" noOfLines={1} display="flex" alignItems="center" key={el.folderId}>
              </Heading>
              <AiFillFolder />
              {/* <Box height={"5rem"} width={"100%"} p="5" mt="5"
              backgroundColor="#FFFFFF" rounded="lg" key={el.folderId} boxShadow="md"> */}
              {/* <Flex alignItems={"center"}>
              <ArrowRightIcon w={3} h={3} color="red.500" marginRight={3} /> */}
              <Link href="/todolist/task"
                _hover={{ textDecoration: "none" }}>
                <Text marginLeft={3} fontSize={"2xl"}>{el.folderName}</Text>
              </Link>
              <Spacer />
              {/* <Box textAlign={"right"} as="b" pr={"1rem"} color="green">
              {el.isChecked && "Finished"}
            </Box> */}
              {/* </Flex> */}
              {/* </Box> */}
            </Flex>
          </Box>
        ))
      }
    </ToDoListAppBody>
  )
}

export default folderpage
