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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Button,
  ButtonGroup,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
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
import AppBody from "src/components/share/app/AppBody"
import ToDoListAppBody from "src/components/todolist/ToDoListAppBody"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { EditIcon } from "@chakra-ui/icons"
import { DeleteIcon } from "@chakra-ui/icons"
import { CheckIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"

const task = () => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isCheckOpen, onOpen: onCheckOpen, onClose: onCheckClose } = useDisclosure()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isBackOpen, onOpen: onBackOpen, onClose: onBackClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const [descList, setDescList] = useState<any>({})
  const navigate = useNavigate()

  // const location = useLocation()
  // console.log(location.state.taskId);

  let { taskid } = useParams()

  // console.log(location.task);

  useEffect(() => {
    // fetchTaskList();
    console.log("hyyhyt");

    API.post("/todolist/detail", { taskId: taskid }).then((res) => {
      setDescList(res.data);
      console.log("grrrr", res.data);
    })
  }, [])

  const deleteTask = (taskId: string) => {
    API.post("/todolist/deleteTask", { taskId: taskId }).then((res) => {
      console.log(res.data);
    })
  }

  const finishTask = (taskId: string) => {
    API.post("/todolist/finishtask", { taskId: taskId }).then((res) => {
      console.log(res.data)
    })
  }


  return (
    <ToDoListAppBody>
      <Heading as="h2" size="xl" noOfLines={1} >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button bgColor="orange.200" color={"white"} onClick={onBackOpen}>
            <Link href="/todolist">
              <ArrowBackIcon />
            </Link>
          </Button>
          <Button bgColor="orange.200" color={"white"} onClick={onEditOpen} >
            <Link href="/todolist/edittask">
              <EditIcon />
            </Link>
          </Button>
        </Box>
      </Heading>
      <Box margin-top={10}>
        <Heading as="h2" size="xl" noOfLines={1} >
          {descList.taskName}
        </Heading>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Description
        </Heading>
        <Text fontSize="sm">
          <Text as="h2" size="md">{descList.taskDesc}</Text>
        </Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Due Date
        </Heading>
        {/* <Input placeholder="Select Date and Time" size="md" type="datetime-local" /> */}
        <Text fontSize="sm">{dayjs(descList.due).format("dddd d MMMM YYYY")}</Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Time
        </Heading>
        <Text fontSize="sm">{dayjs(descList.due).format("HH:mm:ss")}</Text>
        <Heading as="h2" size="md" mt={8} mb={2}>
          Type
        </Heading>
        <Text fontSize="sm">{descList.taskType}</Text>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginY={10}>
          <Button onClick={onDeleteOpen} color={"white"} bgColor="orange.200" width="40px" h="40px">
            <DeleteIcon />
          </Button>
          <Button onClick={onCheckOpen} color={"white"} bgColor="orange.200" width="40px" h="40px">
            <CheckIcon />
          </Button>
        </Box>
      </Box>


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
              deleteTask(descList.taskId)
              navigate({
                pathname: "/todolist/"
              })
            }}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isCheckOpen} onClose={onCheckClose} isCentered>
        <ModalOverlay />
        <ModalContent textAlign={"center"}>
          <ModalHeader fontWeight="800" fontSize={"35px"}>
            !! Warning !!
          </ModalHeader>
          <VStack spacing={3} pt="30px">
            <Text fontSize={"20px"} fontWeight="500">
              Do you want to check ?
            </Text>
          </VStack>
          <ModalCloseButton />
          <ModalFooter justifyContent={"center"} pt="60px">
            <Button colorScheme="red" mr={3} onClick={onCheckClose}>
              No
            </Button>
            <Button colorScheme="green" mr={3} onClick={() => {
              onCheckClose()
              finishTask(descList.taskId)
              navigate({
                pathname: "/todolist/"
              })
            }}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ToDoListAppBody>
  )
}



export default task
