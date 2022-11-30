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
    useToast,
    Input,
    SimpleGrid,
    VStack,
    Divider,
} from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi"
import { AiFillDelete, AiOutlineCloseCircle, AiOutlineUpload, AiOutlineUsergroupAdd } from "react-icons/ai"
import { MdDeleteOutline } from "react-icons/md"
import { BiDownArrow, BiLibrary, BiUpArrow } from "react-icons/bi"
import LiList from "./liList"
import { Link, useNavigate, useParams } from "react-router-dom"
import search from "src/pages/restaurant/search"
import { BsCheckLg } from "react-icons/bs"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"
import InLiList from "./inLiList"

const liList: FC<{
    topic: String
    course: String
    desc: String
    link: String
    owner: String
    date: string | any
    isPublic: boolean
}> = ({ topic, course, desc, link, owner, date, isPublic }) => {
    const user = useContext(authContext)
    const param = useParams()

    const [li, setLi] = useState([])
    const [access, setAccess] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getPeople/" + param.id).then((item) => {
            setAccess(item.data)
        })
        API.get("/shortnotes/getLibrary").then((item) => {
            setLi(item.data)
        })
    }, [])
    const { isOpen: mliIsOpen, onOpen: mliOnOpen, onClose: mliOnClose } = useDisclosure()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: apIsOpen, onOpen: apOnOpen, onClose: apOnClose } = useDisclosure()
    useEffect(() => {
        if (!apIsOpen) {
            setPeoples([])
        }
    }, [apIsOpen])

    const navigate = useNavigate()
    const x = btoa("?type=shortnote&id=" + param.id)
    const goToUpload = () => {
        navigate({
            pathname: "../../airdrop/upload",
            search: x,
        })
    }

    const deleteShortnote = () => {
        API.delete("/shortnotes/deleteShortnote/" + param.id).then(() => {
            navigate({
                pathname: "../shortnotes",
            })
        })
    }

    const addToLibrary = (li: string) => {
        API.post("/shortnotes/postInLibrary", {
            snId: param.id,
            libId: li
        })
    }
    const toast = useToast()


    const [pName, setpName] = useState("")
    const [people, setPeoples] = useState<string[]>([])

    const addPoeple = () => {
        API.post("/shortnotes/postAccess", {
            snId: param.id,
            people: people
        })
    }

    const deletePoeple = (u: any) => {
        API.delete("/shortnotes/deletePeople", {
            data: {
                snId: param.id,
                userId: u
            }
        })
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
                        {owner == user?.fName + " " + user?.lName ? <>
                            {isPublic == false ?
                                <MenuItem icon={<AiOutlineUsergroupAdd />} onClick={apOnOpen}>
                                    Manage people
                                </MenuItem>
                                :
                                null
                            }
                            <MenuItem icon={<AiOutlineUpload />} onClick={goToUpload}>
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
                <Text color={"blue.500"}>{link}</Text>
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
                                <Box onClick={() => {
                                    addToLibrary(li.libId)
                                    toast({
                                        title: 'Shortnote added',
                                        description: "You've added the shortnote to your library.",
                                        status: 'success',
                                        duration: 4000,
                                        isClosable: true,
                                    })
                                }}>
                                    <LiList name={li.libName}></LiList>
                                </Box>
                            ))}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Modal onClose={apOnClose} isOpen={apIsOpen} isCentered scrollBehavior={"inside"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Manage people
                        <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={2}>
                            <GridItem colSpan={4}>
                                <Input
                                    placeholder="studentID, comma seperated"
                                    focusBorderColor="orange.500"
                                    value={pName}
                                    onChange={(e) => setpName(e.target.value)}
                                ></Input>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Button
                                    colorScheme={"orange"}
                                    rounded={8}
                                    w={"100%"}
                                    onClick={() => {
                                        let x = pName.split(',')
                                        //let newPeople = [pName, ...people] //add to begin
                                        let newPeople = x.concat(people)
                                        setPeoples(newPeople)
                                        setpName("")
                                    }}
                                >
                                    Add
                                </Button>
                            </GridItem>
                        </Grid></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box gap={2} mt={4} mb={4}>
                            <SimpleGrid columns={2} gap={4}>
                                {people.map((p, key) => (
                                    <Grid templateColumns='repeat(5, 1fr)' bg={"white"} boxShadow={"base"} rounded={8} key={key} w={"100%"} p={2}>
                                        <GridItem colSpan={4}>
                                            <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
                                                <Text>{p}</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem>
                                            <Button variant={"ghost"} onClick={() => {
                                                let x = people.filter((e) => e != p)
                                                setPeoples(x)
                                            }}>
                                                <AiOutlineCloseCircle />
                                            </Button>
                                        </GridItem>
                                    </Grid>
                                ))}
                            </SimpleGrid>
                            <Divider my={6} />
                            <Heading mb={2} size={"md"}>Peoples</Heading>
                            <VStack gap={2}>
                                {access.map((a: any, key) => (
                                    <Grid templateColumns='repeat(7, 1fr)' bg={"white"} boxShadow={"base"} rounded={8} key={key} w={"100%"} p={2}>
                                        <GridItem colSpan={6}>
                                            <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
                                                <Text w={"100%"}>{a.accessBy.studentId}</Text>
                                                <Text w={"100%"}>{a.accessBy.fName} {a.accessBy.lName}</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem>
                                            <Button variant={"ghost"} onClick={() => {
                                                deletePoeple(a.accessBy.userId)
                                                toast({
                                                    title: 'People deleted',
                                                    description: "You've deleted people to access this shortnote.",
                                                    status: 'success',
                                                    duration: 4000,
                                                    isClosable: true,
                                                })


                                                let x: any = access.filter((e: any) => e != a)
                                                setAccess(x)
                                            }}>
                                                <AiOutlineCloseCircle />
                                            </Button>
                                        </GridItem>
                                    </Grid>
                                ))}
                            </VStack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            addPoeple()
                            apOnClose()
                            toast({
                                title: 'People added',
                                description: "You've added people to access this shortnote.",
                                status: 'success',
                                duration: 4000,
                                isClosable: true,
                            })
                        }} w={"100%"} colorScheme={"orange"}>Done</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default liList
