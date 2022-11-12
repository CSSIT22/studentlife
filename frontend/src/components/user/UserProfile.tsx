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
    extendTheme,
    HStack,
} from "@chakra-ui/react"

import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"

import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react"

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { BsThreeDotsVertical, BsFillFlagFill } from "react-icons/bs"

export default function SimpleThreeColumns() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState("inside")
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const cancelRef = React.useRef()

    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    // 3. Extend the theme
    const theme = extendTheme({ breakpoints })

    return (
        <Box maxW="100%" borderRadius="none" overflow="hidden" p="5">
            <Grid
                templateAreas={`
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={{ base: "80% 1fr 50%", md: "70% 1fr 50%" }}
                gridTemplateColumns={"20% 1fr"}
                h="100%"
                gap="2"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="md"
                bg={{ base: "", md: "white" }}
                shadow={{ base: "", md: "lg" }}
            >
                <GridItem rounded="xl" area={"nav"} mt={5}>
                    <VStack align="stretch" alignItems="center" ml={7}>
                        <Avatar
                            pt={2}
                            display="flex"
                            position="initial"
                            size="2xl"
                            shadow="xl"
                            name="Christian Nwamba"
                            src="https://bit.ly/code-beast"
                        />{" "}
                        <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" mt={15} fontSize={"xl"} ml={{ base: "10", md: "" }} area={"main"} color="gray.700">
                    <Box p={1}>Id: 64130500XXX</Box>

                    <Box p={1} fontSize={"xl"}>
                        Name: John Doe
                    </Box>
                    <HStack alignItems="flex-start">
                        <Box p={1} fontSize={"xl"}>
                            Fuculty: SIT
                        </Box>
                        <Box p={1} fontSize={"xl"}>
                            Major: Computer Science
                        </Box>
                    </HStack>
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl">
                    <ButtonGroup color="white" variant="solid" spacing="6">
                        <Button pl={5} bg="orange.600" position="initial" value="inside" shadow={"lg"} onClick={onOpen}>
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
                                    <Button colorScheme="orange" mr={3}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Button pl={5} bg="orange.600" position="initial" shadow={"lg"}>
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
