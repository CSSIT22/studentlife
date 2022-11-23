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
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { BiLibrary } from "react-icons/bi"
import LiList from "./liList"
import InLiList from "./inLiList"
import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import API from "src/function/API"

const btnMyLibrary = () => {
    const { isOpen: mliIsOpen, onOpen: mliOnOpen, onClose: mliOnClose } = useDisclosure()
    const { isOpen: nliIsOpen, onOpen: nliOnOpen, onClose: nliOnClose } = useDisclosure()
    const { isOpen: inliIsOpen, onOpen: inliOnOpen, onClose: inliOnClose } = useDisclosure()

    const [nPicked, setNPicked] = useState("")

    const [li, setLii] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getLibrary").then((item) => {
            setLii(item.data)
        })
    }, [])

    const [picked, setPicked] = useState()
    const [selectedLi, setSelectedLi] = useState<any>([])
    useEffect(() => {
        inLibraryFilter()
    }, [picked])

    const inLibraryFilter = () => {
        setSelectedLi(li.filter((items: any) => items.libId == picked))
        console.log(selectedLi);

    }


    // const li = [
    //     { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", name: "Network midterm", owner: "grehg343-gj54-4bad-9gre-fkg9fidhjd89" },
    //     { id: "grehg343-gj54-4bad-9gre-fkg9fidhjd89", name: "Year 1 term 2 ", owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" },
    // ]
    // const inLi = [
    //     {
    //         topic: "How to make ER diagram in 10 minutes.",
    //         liId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    //         course: "CSC218",
    //         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    //     },
    //     {
    //         topic: "How to make ER diagram in 10 minutess.",
    //         liId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    //         course: "CSC218",
    //         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    //     },
    //     {
    //         topic: "How to make ER diagram in 10 minutesss.",
    //         liId: "grehg343-gj54-4bad-9gre-fkg9fidhjd89",
    //         course: "CSC218",
    //         owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    //     },
    // ]

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
                            {li.map((lii: any, key) => (
                                <Box
                                    as="button"
                                    onClick={() => {
                                        setNPicked(lii.libName) //collect selected li.name
                                        setPicked(lii.libId) //collect selected li.id
                                        inliOnOpen()
                                    }}
                                >
                                    <LiList name={lii.libName}></LiList>
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
                                    <Input focusBorderColor="orange.500" variant="outline" placeholder="" />
                                </Box>
                                <Button colorScheme="orange" w={"100%"}>
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
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4}>
                            {selectedLi.map((filter: any) => (
                                <InLiList name={filter.libId} course={filter.libName} />
                            ))}

                        </VStack>
                    </DrawerBody>

                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default btnMyLibrary
