import React, { FC, useState } from "react"
import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    Spacer,
    HStack,
    GridItem,
    Grid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Stack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    IconButton,
    chakra,
    useCheckboxGroup,
    useCheckbox,
} from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi"
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai"
import { MdDeleteOutline } from "react-icons/md"
import { BiDownArrow, BiLibrary, BiUpArrow } from "react-icons/bi"
import LiList from "./liList"
import { Link, useNavigate } from "react-router-dom"
import search from "src/pages/restaurant/search"
import { BsCheckLg } from "react-icons/bs"

const liList: FC<{
    topic: String
    course: String
    desc: String
    link: String
    owner: String
}> = ({ topic, course, desc, link, owner }) => {
    const { isOpen: mliIsOpen, onOpen: mliOnOpen, onClose: mliOnClose } = useDisclosure()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
    const goToUpload = () => {
        navigate({
            pathname: "../../airdrop",
            search: "?type=shortnotes",
        })
    }
    const [liPicked, setLiPicked] = useState<String[]>([])

    const li = [
        { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", name: "csc120 week 2", owner: "grehg343-gj54-4bad-9gre-fkg9fidhjd89" },
        { id: "grehg343-gj54-4bad-9gre-fkg9fidhjd89", name: "csc210 week 6", owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" },
    ]
    function CustomCheckbox(props: any) {
        const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

        return (
            <chakra.label gridColumnGap={2} bg="white" h={100} shadow={"xl"} rounded={8} p={2} cursor="pointer" {...htmlProps}>
                <input {...getInputProps()} hidden />

                <Grid templateColumns="repeat(3, 1fr)" h={"100%"} w={"100%"}>
                    <GridItem colSpan={2}>
                        <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
                            <Heading size={"md"}>{props.name}</Heading>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex w={"100%"} h={"100%"} justifyContent={"end"} alignItems={"center"} pr={30}>
                            {/* {state.isChecked && <Box w={"100%"} h={"100%"} bg="orange.500" rounded={8} />} */}

                            {state.isChecked && (
                                // <Box bg={"white"} p={4} shadow={"md"}>
                                <BsCheckLg fontSize={30} color={"#e65d10"} />

                                // </Box>
                            )}
                        </Flex>
                    </GridItem>
                </Grid>
            </chakra.label>
        )
    }
    const { value, getCheckboxProps } = useCheckboxGroup({
        //defaultValue: ["grehg343-gj54-4bad-9gre-fkg9fidhjd89"],
    })
    return (
        <Box>
            <HStack>
                <Heading size={"lg"}>{topic}</Heading>
                <Spacer />
                <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<HiDotsHorizontal />} variant="ghost" />
                    <MenuList>
                        <MenuItem icon={<BiLibrary />} onClick={mliOnOpen}>
                            Add to library
                        </MenuItem>
                        <MenuItem icon={<AiOutlineUpload />} onClick={goToUpload}>
                            Upload file
                        </MenuItem>
                        <MenuItem icon={<MdDeleteOutline />} onClick={onOpen}>
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>

            <Heading size={"sm"} bg={"orange.500"} color={"white"} rounded={8} w={20} py={1} mb={6} textAlign={"center"} boxShadow={"xl"}>
                {course}
            </Heading>
            <Box mb={4}>
                <Text>{desc}</Text>
            </Box>
            <Box mb={4}>
                <Heading size={"md"}>Link</Heading>
                <Link to={"./fileId"}>
                    <Text color={"blue.500"}>{link}</Text>
                </Link>
            </Box>
            <HStack>
                {/* <HStack>
                    <Box as="button">
                        <Text
                            fontSize={"30px"}
                            _hover={{ bg: "#ebedf0" }}
                            _active={{
                                bg: "#dddfe2",
                                transform: "scale(0.98)",
                                borderColor: "#bec3c9",
                            }}
                        >
                            <BiUpArrow />
                        </Text>
                    </Box>
                    <Text>0</Text>
                    <Box as="button">
                        <Text
                            fontSize={"30px"}
                            _hover={{ bg: "#ebedf0" }}
                            _active={{
                                bg: "#dddfe2",
                                transform: "scale(0.98)",
                                borderColor: "#bec3c9",
                            }}
                        >
                            <BiDownArrow />
                        </Text>
                    </Box>
                </HStack> */}
                <Spacer />
                <Text fontSize={"xs"}>Posted by {owner}</Text>
            </HStack>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete shortnote</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to delete this shortnote?</ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} colorScheme={"red"}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Drawer isOpen={mliIsOpen} placement="right" onClose={mliOnClose} size={"sm"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <HStack gap={4}>
                            <Heading size={"lg"}> My library</Heading>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack gap={4}>
                            {/* {li.map((li, key) => (
                                <Box
                                    as="button"
                                    onClick={() => {
                                        let x = [...liPicked, li.id]
                                        setLiPicked(x)
                                        console.log(liPicked)
                                    }}
                                >
                                    <LiList name={li.name}></LiList>
                                </Box>
                            ))} */}
                            {li.map((li, key) => (
                                <CustomCheckbox {...getCheckboxProps({ value: li.id, name: li.name })} onClick={console.log(value)} />
                            ))}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button w={"100%"} colorScheme={"orange"}>
                            Done
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default liList
