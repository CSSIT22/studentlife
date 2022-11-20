import React, { useState } from "react"
import { ReactElement } from "react"
import FriendList from "../user/FriendList"
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
    Link,
} from "@chakra-ui/react"

import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"

import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react"

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { BsThreeDotsVertical, BsFillFlagFill } from "react-icons/bs"

export default function SimpleThreeColumns() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { isOpen: isFriendListOpen, onOpen: onFriendListopen, onClose: onFriendListClose } = useDisclosure()
    const btnRef = React.useRef(null)

    const [isFollow, setIsFollow] = useState(false)

    function handleClick() {
        setIsFollow(!isFollow)
    }

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const cancelRef = React.useRef()

    const breakpoints = {
        sm: "400px",
        md: "800px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    // 3. Extend the theme
    const theme = extendTheme({ breakpoints })

    return (
        <Box maxW="100%" borderRadius="none" rounded="2xl" overflow="hidden" p={5} pt={{ md: "45px", base: "0" }} ml={{ base: "3", md: "0" }}>
            <Grid
                templateAreas={{
                    base: `
                "nav main "
                "nav followlist"
                "nav footer"`,
                    md: `
                  "nav main followlist"
                  "nav main footer"`,
                }}
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
                            mt={{ md: "-70px", base: "0" }}
                            display="flex"
                            position="initial"
                            float={"inline-end"}
                            size={{ md: "3xl", base: "2xl" }}
                            shadow="xl"
                            name="Christian Nwamba"
                            src="https://bit.ly/code-beast"
                        />{" "}
                        <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" mt={{ base: "3", md: "0", lg: "15" }} ml={{ base: "10", lg: "" }} alignSelf={"end"} area={"main"} color="gray.700">
                    <HStack p={1} ml="3">
                        <Box fontSize={{ lg: "md", base: "sm" }} color="orange.700">
                            ID :
                        </Box>
                        <Box fontSize={{ lg: "lg", base: "md" }}>64130500XXX</Box>
                    </HStack>

                    <Stack p={1} direction={{ base: "column", md: "row" }}>
                        <Box fontSize={{ lg: "5xl", base: "xl" }}>Vatcharamai Rodring</Box>
                    </Stack>

                    <Stack direction={{ base: "column", lg: "row" }} alignItems="flex-start" spacing={-0.5} mb="5">
                        <Stack p={1} direction="row" alignItems="center">
                            <Box fontSize={{ base: "sm", lg: "lg" }} display={{ base: "block", lg: "none" }} color="orange.700">
                                Faculty :
                            </Box>
                            <Box fontSize={{ base: "md", lg: "xl" }}>SIT</Box>
                            <Box fontSize={{ base: "lg", lg: "lg" }} display={{ base: "none", lg: "block" }} color="orange.700">
                                ,
                            </Box>
                        </Stack>

                        <Stack
                            p={1}
                            direction={{ base: "row", lg: "row" }}
                            alignItems={{ base: "center", md: "flex-start", lg: "center" }}
                            spacing={{ base: "2", md: "2", lg: "2" }}
                        >
                            <Box fontSize={{ base: "sm", lg: "lg" }} display={{ base: "block", lg: "none" }} color="orange.700">
                                Major :
                            </Box>
                            <Box fontSize={{ base: "md", lg: "xl" }}>Computer Science</Box>
                        </Stack>
                    </Stack>
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl" ml={{ base: "3", md: "10", lg: "6" }}>
                    <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
                        <Button
                            pl={5}
                            width={{ lg: "7rem", base: "" }}
                            height={{ lg: "3rem", base: "2rem" }}
                            fontSize={{ base: "", lg: "lg" }}
                            bg="orange.600"
                            _hover={{ background: "orange.200" }}
                            position="initial"
                            value="inside"
                            shadow={"lg"}
                            onClick={onOpen}
                        >
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

                                    <HStack mt={4}>
                                        <FormControl>
                                            <FormLabel>Age</FormLabel>
                                            <NumberInput max={999} min={0}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Birth Date</FormLabel>
                                            <Input placeholder="Select Date and Time" size="md" type="date" />
                                        </FormControl>
                                    </HStack>

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

                                    <FormControl mt={4}>
                                        <FormLabel>Years</FormLabel>
                                        <NumberInput max={8} min={1}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
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
                        <Button pl={5} bg="orange.600" _hover={{ background: "orange.200" }} width={{ lg: "9rem", base: "" }}
                            height={{ lg: "3rem", base: "2rem" }} fontSize={{ base: "", lg: "lg" }} position="initial" shadow={"lg"}>
                            Create blog
                        </Button>{" "}
                    </ButtonGroup>
                </GridItem>
                <GridItem rounded="xl" area={"followlist"} mt={{ base: "-2rem", md: "3rem" }} mr={5}>
                    <Stack direction="row" mx={{ base: "50", lg: "" }} spacing={{ base: "", md: "" }}>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-1.5", md: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>0</Box>
                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700">
                                    Follower
                                </Box>

                                <Modal onClose={onFriendListClose} finalFocusRef={btnRef} isOpen={isFriendListOpen}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Follower</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody rounded="xl">
                                            <FriendList />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onFriendListClose} display={{ base: "none", md: "block" }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Link>
                        </Stack>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-3.5", lg: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>0</Box>

                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700" mt="0.5rem">
                                    Following
                                </Box>

                                <Modal onClose={onFriendListClose} finalFocusRef={btnRef} isOpen={isFriendListOpen}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Following</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody rounded="xl">
                                            <FriendList />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onFriendListClose} display={{ base: "none", md: "block" }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Link>
                        </Stack>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>

        // Help me goddddd it almost finish but my eyes can handle much any more sorry for what i done this is the end of me nowww thank you everyone for support me and help me love you mom dad and my bro sry to be a
        // croward sorry
    )
}
