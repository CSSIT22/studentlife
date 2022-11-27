import React, { FC, useContext, useEffect, useState } from "react"
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
import { Link, useNavigate, useParams } from "react-router-dom"
import search from "src/pages/restaurant/search"
import { BsCheckLg } from "react-icons/bs"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"

const liList: FC<{
    topic: String
    course: String
    desc: String
    link: String
    owner: String
    date: string | any
}> = ({ topic, course, desc, link, owner, date }) => {
    const user = useContext(authContext)

    const [li, setLi] = useState([])

    useEffect(() => {
        API.get("/shortnotes/getLibrary").then((item) => {
            setLi(item.data)
        })
    }, [])
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

    const param = useParams()
    const deleteShortnote = () => {
        API.delete("/shortnotes/deleteShortnote/" + param.id)
    }

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
    const addToLibrary = () => {
        API.post("/shortnotes/postInLibrary", {
            snId: param.id,
            libId: value
        })
        window.location.reload()
    }
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
                        {owner == user?.fName + " " + user?.lName ? <><MenuItem icon={<AiOutlineUpload />} onClick={goToUpload}>
                            Upload file
                        </MenuItem>
                            <MenuItem icon={<MdDeleteOutline />} onClick={onOpen}>
                                Delete
                            </MenuItem></> : null}

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
                <Text fontSize={"xs"}>Posted by {owner} at {new Date(date).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}</Text>
            </HStack>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete shortnote</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to delete this shortnote?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            deleteShortnote()
                            onClose()
                            navigate({
                                pathname: "../shortnotes",
                            })
                            window.location.reload()
                        }} colorScheme={"red"}>
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
                            {li.map((li: any, key) => (
                                <CustomCheckbox key={key} {...getCheckboxProps({ value: li.libId, name: li.libName })} />
                            ))}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button w={"100%"} colorScheme={"orange"} onClick={addToLibrary}>
                            Done
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default liList
