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
import React, { useState } from "react"
import { BiLibrary } from "react-icons/bi"
import LiList from "./liList"
import InLiList from "./inLiList"
import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"

const btnMyLibrary = () => {
    const { isOpen: mliIsOpen, onOpen: mliOnOpen, onClose: mliOnClose } = useDisclosure()
    const { isOpen: nliIsOpen, onOpen: nliOnOpen, onClose: nliOnClose } = useDisclosure()
    const { isOpen: inliIsOpen, onOpen: inliOnOpen, onClose: inliOnClose } = useDisclosure()

    const [picked, setPicked] = useState("")
    const [nPicked, setNPicked] = useState("")
    {
        /*}
    async function openNli() {
        await nliOnOpen()
        await mliOnClose()
    }
    async function closeNli() {
        await nliOnClose()
        await mliOnOpen()
    }
    async function openInLi() {
        await inliOnOpen()
        await mliOnClose()
    }
    async function closeInli() {
        await inliOnClose()
        await mliOnOpen()
    }
*/
    }

    const li = [
        { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", name: "Network midterm", owner: "grehg343-gj54-4bad-9gre-fkg9fidhjd89" },
        { id: "grehg343-gj54-4bad-9gre-fkg9fidhjd89", name: "Year 1 term 2 ", owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" },
    ]
    const inLi = [
        {
            topic: "How to make ER diagram in 10 minutes.",
            liId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        },
        {
            topic: "How to make ER diagram in 10 minutess.",
            liId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        },
        {
            topic: "How to make ER diagram in 10 minutesss.",
            liId: "grehg343-gj54-4bad-9gre-fkg9fidhjd89",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        },
    ]

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
                            {li.map((li, key) => (
                                <Box
                                    as="button"
                                    onClick={() => {
                                        setNPicked(li.name) //collect selected li.name
                                        setPicked(li.id) //collect selected li.id
                                        inliOnOpen()
                                        console.log(picked)
                                    }}
                                >
                                    <LiList name={li.name}></LiList>
                                </Box>
                            ))}
                            {/* <Box as="button" onClick={inliOnOpen}>
                                <LiList name={"midterm y2/1"}></LiList>
                            </Box>
                            <LiList name={"Network"}></LiList>
                            <LiList name={"Algo p1"}></LiList>
                            <LiList name={"Java"}></LiList>
                            <LiList name={"midterm y2/1"}></LiList>
                            <LiList name={"Network"}></LiList>
                            <LiList name={"Algo p1"}></LiList>
                            <LiList name={"Java"}></LiList> */}
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
                            {inLi.map((inLi, key) => (
                                <InLiList name={inLi.topic} course={inLi.course} />
                            ))}
                            {/* <Box w={"100%"}>
                                <Link to={"./shortnoteDetail"}>
                                    <InLiList name={"Shortnote 001"} course={"CSC213"} />
                                </Link>
                            </Box>
                            <InLiList name={"Shortnote 002"} course={"CSC214"} />
                            <InLiList name={"Shortnote 003"} course={"CSC215"} />
                            <InLiList name={"Shortnote 001"} course={"CSC213"} />
                            <InLiList name={"Shortnote 002"} course={"CSC214"} />
                            <InLiList name={"Shortnote 003"} course={"CSC215"} /> */}
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default btnMyLibrary
