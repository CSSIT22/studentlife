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
        <Box maxW="100%" borderRadius="none" overflow="hidden" p="5">
            <Grid
                templateAreas={{
                    base: `
                "nav main "
                "nav followlist"
                "nav footer"`,
                    md: `
                  "nav main followlist"
                  "nav footer footer"`,
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
                <GridItem pl="2" mt={15} ml={{ base: "10", md: "" }} area={"main"} color="gray.700">
                    <HStack p={1}>
                        <Box fontSize={"lg"} color="orange.700">
                            ID :
                        </Box>
                        <Box fontSize={"xl"}>64130500XXX</Box>
                    </HStack>

                    <HStack p={1}>
                        <Box fontSize={"lg"} color="orange.700">
                            Name :
                        </Box>
                        <Box fontSize={"xl"}>John Doe</Box>
                    </HStack>

                    <Stack direction={{ base: "column", lg: "row" }} alignItems="flex-start" spacing={-0.5} mb="5">
                        <Stack p={1} direction="row" alignItems="center">
                            <Box fontSize={{ base: "sm", md: "lg" }} color="orange.700">
                                Faculty :
                            </Box>
                            <Box fontSize={{ base: "md", md: "xl" }}>SIT</Box>
                        </Stack>

                        <Stack
                            p={1}
                            direction={{ base: "row", md: "column", lg: "row" }}
                            alignItems={{ base: "center", md: "flex-start", lg: "center" }}
                            spacing={{ base: "2", md: "-1", lg: "2" }}
                        >
                            <Box fontSize={{ base: "sm", md: "lg" }} color="orange.700">
                                Major :
                            </Box>
                            <Box fontSize={{ base: "md", md: "xl" }}>Computer Science</Box>
                        </Stack>
                    </Stack>
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl" ml={{ base: "", md: "10" }}>
                    <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
                        <Button
                            pl={5}
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
                        <Button pl={5} bg="orange.600" _hover={{ background: "orange.200" }} position="initial" shadow={"lg"}>
                            Create blog
                        </Button>{" "}
                    </ButtonGroup>
                </GridItem>
                <GridItem rounded="xl" area={"followlist"} mt={{ base: "-2.5rem", md: "3rem" }} mr={5}>
                    <Stack direction="row" mx={{ base: "50", md: "" }} spacing={{ base: "", md: "" }}>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-1.5", md: "" }}>
                            <Box fontSize={"lg"}>0</Box>
                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={"lg"} color="orange.700">
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
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-3.5", md: "" }}>
                            <Box fontSize={"lg"}>0</Box>

                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={"lg"} color="orange.700" mt="0.5rem">
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
