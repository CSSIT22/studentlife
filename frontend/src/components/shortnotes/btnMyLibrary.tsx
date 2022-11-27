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

        console.log(liPicked);

        console.log(snByLi);
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
        }).then((res) => console.log(res)
        )
    }
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const deleteLibrary = () => {
        API.delete("shortnotes/deleteLibrary", {
            libId: liPicked
        })
    }
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
                                        duration: 9000,
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
                                <Box as="button" w={"100%"} onClick={() => {
                                    navigate({
                                        pathname: "./" + sn.sn.snId,
                                    })
                                }}>
                                    <InLiList key={key} name={sn.sn.snName} course={sn.sn.course.courseName} />
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
                            window.location.reload()
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
