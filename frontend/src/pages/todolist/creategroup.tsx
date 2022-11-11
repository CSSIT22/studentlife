import React from "react"
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
import { useControllableProp, useControllableState } from '@chakra-ui/react'

const [isControlled, value] = useControllableProp(propValue, stateValue){
function Example() {
  const [value, setValue] = useControllableState({ defaultValue: 40 })
  return (
    <div>
      <Button onClick={() => setValue(value + 1)}>+</Button>
      <Box as='span' w='200px' mx='24px'>
        {value}
      </Box>
      <Button onClick={() => setValue(value - 1)}>-</Button>
    </div>
  )
}}

const creategroup = () => {
    return (
        <ToDoListAppBody>
            <Heading as="h1" size="3xl" noOfLines={1}>
                Create Group
            </Heading>

            <Box margin-top={10}>
                <Heading as="h2" size="md" noOfLines={1} marginY={10} marginInline={5}>
                    Members
                </Heading>
                <Box display="flex" flexDirection={"column"} flexWrap={"wrap"} marginY={10}>
                    1. 
                    <Input variant="flushed" placeholder="Insert UID" width={"50%-24px"} />
                    <Input variant="flushed" placeholder="Member Name" />
                </Box>
                <Box display="flex" flexDirection={"column"} flexWrap={"wrap"} marginY={10}>
                    2.
                    <Input variant="flushed" placeholder="Insert UID" width={"50%-24px"} />
                    <Input variant="flushed" placeholder="Member Name" />
                </Box>
                <Box display="flex" flexDirection={"column"} flexWrap={"wrap"} marginY={10}>
                    3.
                    <Input variant="flushed" placeholder="Insert UID" width={"50%-24px"} />
                    <Input variant="flushed" placeholder="Member Name" />
                </Box>

                <IconButton bgColor={"grey.900"} aria-label="AddIcon" padding="20px" marginX="5px" icon={<AddIcon />} />

                <Box display="flex" justifyContent="center" alignItems="center" marginY={10}>
                    <Button colorScheme="teal" size="lg" bgColor={"orange.500"}>
                        Done
                    </Button>
                </Box>
            </Box>
        </ToDoListAppBody>
    )
}

export default creategroup
