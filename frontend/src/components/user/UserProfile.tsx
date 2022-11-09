import React from "react"
import { ReactElement } from "react"
import {
    Box,
    Avatar,
    VStack,
    Grid,
    GridItem,
    Button,
    ButtonGroup,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Stack,
    Flex,
    Text,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    CheckboxGroup,
    useToast,
    AlertDialogCloseButton,
    FormErrorMessage,
    FormHelperText,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useBreakpointValue,
} from "@chakra-ui/react"

import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"

import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react"

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { BsThreeDotsVertical, BsFillFlagFill } from "react-icons/bs"

export default function SimpleThreeColumns() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const cancelRef = React.useRef()

    return (
        <Box maxW="95%" borderRadius="none" overflow="hidden" p="5">
            <Grid
                templateAreas={`
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={"150px 6fr 300px"}
                gridTemplateColumns={"150px 1fr"}
                h="200px"
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="md"
            >
                <GridItem rounded="xl" bg="orange.400" area={"nav"}>
                    <VStack align="stretch" alignItems="center">
                        <Avatar pt={2} display="flex" position="initial" size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
                        <Box textAlign="center" color="white" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" rounded="xl" bg="orange.400" area={"main"}>
                    <Box my="3" p={2} color="white">
                        Id: 64130500XXX
                    </Box>

                    <Box p={2} color="white">
                        Name: John Doe
                    </Box>
                    <Box p={2} color="white">
                        Fucuty: SIT Major: Computer Science
                    </Box>
                </GridItem>
                <GridItem pl="2" area={"footer"}>
                    <ButtonGroup color="white" variant="outline" spacing="6">
                        <Button pl={5} bg="orange.400" position="initial" onClick={onOpen}>
                            Edit
                        </Button>
                        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>About Me</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Input ref={initialRef} placeholder="Phone Number" />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Age</FormLabel>
                                        <NumberInput max={999} min={0}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Sex</FormLabel>
                                        <Select>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>LGBTQ+</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Hobby</FormLabel>
                                        <Input placeholder="your favorite free time activity" />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Button pl={5} bg="orange.400" position="initial">
                            Create blog
                        </Button>{" "}
                    </ButtonGroup>
                </GridItem>
            </Grid>
        </Box>

        // Help me goddddd it almost finish but my eyes can handle much any more sorry for what i done this is the end of me nowww thank you everyone for support me and help me love you mom dad and my bro sry to be a
        // croward sorry
    )
}
