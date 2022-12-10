import {
    Box,
    Heading,
    Text,
    Button,
    HStack,
    VStack,
    useDisclosure,
    Input,
    Stack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useToast,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Grid,
    GridItem,
    Flex,
} from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { BiLibrary } from "react-icons/bi"
import LiList from "./liList"
import InLiList from "./inLiList"
import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"
import { HiDotsHorizontal } from "react-icons/hi"
import { MdDeleteOutline } from "react-icons/md"

const btnMyLibrary = () => {
    const { isOpen: mliIsOpen, onOpen: mliOnOpen, onClose: mliOnClose } = useDisclosure()
    const { isOpen: nliIsOpen, onOpen: nliOnOpen, onClose: nliOnClose } = useDisclosure()
    const { isOpen: inliIsOpen, onOpen: inliOnOpen, onClose: inliOnClose } = useDisclosure()

    const [nPicked, setNPicked] = useState("")

    const [li, setLi] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getLibrary").then((item) => {
            setLi(item.data)
        })
    }, [])

    const [liPicked, setliPicked] = useState()
    const [selectedLi, setSelectedLi] = useState<any>([])
    const [snByLi, setSnByLi] = useState([])
    useEffect(() => {
        inLibraryFilter()
    }, [liPicked])
    const inLibraryFilter = () => {
        setSelectedLi(li.filter((items: any) => items.libId == liPicked))

        //console.log(liPicked);

        //console.log(snByLi);
    }
    useEffect(() => {
        selectedLi.map((sn: any) => (
            setSnByLi(sn.shortNotes)
        ), [selectedLi])
    })

    const navigate = useNavigate()


    //const user = useContext(authContext)
    const [name, setName] = useState("")

    const submit = () => {
        API.post("/shortnotes/postLibrary", {
            libName: name
        }).then((res) => {
            console.log(res)
            //window.location.reload()           
            setNewLi((newLi: any) => [...newLi, { libId: res.data.libId, name: name }])
        }
        )
        setName("")
    }
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const deleteLibrary = () => {
        let x = li.filter((li: any) => li.libId != liPicked)
        let y = newLi.filter((nli: any) => nli.libId != liPicked)
        setLi(x)
        setNewLi(y)
        inliOnClose()
        API.delete("/shortnotes/deleteLibrary", {
            data: {
                libId: liPicked
            }
        }).then((res) => {
            console.log(res);
            //window.location.reload()
        })
    }

    const { isOpen: inIsOpen, onOpen: inOnOpen, onClose: inOnClose } = useDisclosure()
    const [selectedInLi, setSelectedInLi] = useState("")
    const deleteInLibrary = () => {
        API.delete("/shortnotes/deleteSnInLibrary", {
            data: {
                libId: liPicked,
                snId: selectedInLi
            }
        }).then((res) => {
            console.log(res);
            window.location.reload()
        })
    }
    const [newLi, setNewLi] = useState<any>([])
    return (
        <Box>
            <Button colorScheme="orange" onClick={mliOnOpen}>
                <BiLibrary /> My library
            </Button>
            <Drawer isOpen={mliIsOpen} placement="right" onClose={mliOnClose} size={"sm"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <HStack gap={4}>
                            <Heading size={"lg"}> My library</Heading>
                            <Button colorScheme={"orange"} onClick={nliOnOpen}>
                                New library
                            </Button>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack gap={4}>
                            {li.map((li: any, key) => (
                                <Box
                                    as="button"
                                    onClick={() => {
                                        setNPicked(li.libName) //collect selected li.name
                                        setliPicked(li.libId) //collect selected li.id
                                        inliOnOpen()
                                    }}
                                >
                                    <LiList key={key} name={li.libName}></LiList>
                                </Box>
                            ))}

                            {newLi.map((nli: any, key: any) => (
                                <Box
                                    as="button"
                                    onClick={() => {
                                        setNPicked(nli.name) //collect selected li.name
                                        setliPicked(nli.libId) //collect selected li.id
                                        inliOnOpen()
                                    }}
                                >
                                    <LiList key={key} name={nli.name}></LiList>
                                </Box>
                            )


                            )}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Drawer isOpen={nliIsOpen} placement="right" onClose={nliOnClose} size={"sm"}>
                <DrawerContent>
                    <DrawerHeader>
                        <HStack gap={4}>
                            <Button variant={"ghost"} onClick={nliOnClose}>
                                <IoIosArrowBack />
                            </Button>
                            <Heading size={"lg"}>New library</Heading>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <Box bg={"white"} rounded={8} p={10} w={"100%"}>
                            <VStack spacing={4}>
                                <Heading size={"lg"}>Create new library</Heading>

                                <Box w={"100%"}>
                                    <Text>Name</Text>
                                    <Input focusBorderColor="orange.500" variant="outline" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                                </Box>
                                <Button colorScheme="orange" w={"100%"} onClick={() => {
                                    submit()
                                    nliOnClose()
                                    toast({
                                        title: 'Library created.',
                                        description: "ํYou've created a new library.",
                                        status: 'success',
                                        duration: 4000,
                                        isClosable: true,
                                    })
                                }}>
                                    Create
                                </Button>
                            </VStack>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Drawer isOpen={inliIsOpen} placement="right" onClose={inliOnClose} size={"sm"}>
                <DrawerContent>
                    <DrawerHeader>
                        <HStack gap={4}>
                            <Button variant={"ghost"} onClick={inliOnClose}>
                                <IoIosArrowBack />
                            </Button>
                            <Heading size={"lg"}>{nPicked}</Heading>
                            <Spacer />
                            <Menu>
                                <MenuButton as={IconButton} aria-label="Options" icon={<HiDotsHorizontal />} variant="ghost" />
                                <MenuList>
                                    <MenuItem icon={<MdDeleteOutline />} onClick={onOpen}>
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4}>
                            {snByLi.map((sn: any, key) => (
                                <Box as="button" w={"100%"} boxShadow={"md"} >
                                    <Grid templateColumns="repeat(7, 1fr)">
                                        <GridItem colSpan={6} onClick={() => {
                                            navigate({
                                                pathname: "./" + sn.sn.snId,
                                            })
                                        }}>
                                            <InLiList key={key} name={sn.sn.snName} course={sn.sn.course.courseName} />
                                        </GridItem>
                                        <GridItem>
                                            <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
                                                <Menu>
                                                    <MenuButton as={IconButton} aria-label="Options" icon={<HiDotsHorizontal />} variant="ghost" />
                                                    <MenuList>
                                                        <MenuItem icon={<MdDeleteOutline />} onClick={() => {
                                                            inOnOpen(),
                                                                setSelectedInLi(sn.sn.snId)
                                                        }}>
                                                            Delete
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>

                                            </Flex>
                                        </GridItem>
                                    </Grid>

                                </Box>
                            ))}

                        </VStack>
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete library</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to delete this library?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            deleteLibrary()
                            onClose()
                            toast({
                                title: 'Library deleted.',
                                description: "You've deleted your library.",
                                status: 'success',
                                duration: 4000,
                                isClosable: true,
                            })
                        }} colorScheme={"red"}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal onClose={inOnClose} isOpen={inIsOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete library</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to remove this shortnote from the library?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            deleteInLibrary()
                            onClose()
                            toast({
                                title: 'Shortnote removed..',
                                description: "You've removed your shortnote.",
                                status: 'success',
                                duration: 4000,
                                isClosable: true,
                            })
                        }} colorScheme={"red"}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default btnMyLibrary
