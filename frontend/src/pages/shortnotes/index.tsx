import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    Spacer,
    HStack,
    SimpleGrid,
    VStack,
    Select,
    ButtonGroup,
    Divider,
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
    Input,
    Textarea,
    useRadioGroup,
    useRadio,
    Center,
    InputGroup,
    InputRightElement,
    Stack,
    Square,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    RadioGroup,
    Radio,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"
import Rsn from "../../components/shortnotes/index/rsnList"
import Sn from "../../components/shortnotes/index/snList"
import Li from "../../components/shortnotes/library/liList"

const index = () => {
    const { isOpen: mlIsOpen, onOpen: mlOnOpen, onClose: mlOnClose } = useDisclosure()
    const { isOpen: nlIsOpen, onOpen: nlOnOpen, onClose: nlOnClose } = useDisclosure()
    const { isOpen: nsIsOpen, onOpen: nsOnOpen, onClose: nsOnClose } = useDisclosure()

    const btnRef = React.useRef()

    const [useRadio, setRadio] = useState("Public")

    const closeSnModal = () => {
        nsOnClose()
        setRadio("Public")
    }
    return (
        <AppBody>
            {/*Recent view list section*/}
            <Flex mt={10}>
                <Text alignSelf={"end"}>Recent view</Text>
                <Spacer />
                <Button colorScheme="orange" onClick={mlOnOpen}>
                    My library
                </Button>
                <Drawer isOpen={mlIsOpen} placement="right" onClose={mlOnClose} size={"sm"}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <HStack gap={4}>
                                <Heading size={"lg"}> My library</Heading>
                                {/*<Link to={"./library/newLibrary"}>
                                    <Button colorScheme="orange">New library</Button>
                                </Link>*/}
                                <Button colorScheme={"orange"} onClick={nlOnOpen}>
                                    New library
                                </Button>
                                <Drawer isOpen={nlIsOpen} placement="right" onClose={nlOnClose} size={"sm"}>
                                    <DrawerContent>
                                        <DrawerCloseButton />
                                        <DrawerHeader>
                                            <HStack gap={4}>
                                                <Heading size={"lg"}> New library</Heading>
                                            </HStack>
                                        </DrawerHeader>
                                        <DrawerBody>
                                            <Box bg={"white"} rounded={8} p={10} w={"100%"}>
                                                <VStack spacing={4}>
                                                    <Heading size={"lg"}>Create new library</Heading>

                                                    <Box w={"100%"}>
                                                        <Text>Name</Text>
                                                        <Input variant="outline" placeholder="" />
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
                            </HStack>
                        </DrawerHeader>
                        <DrawerBody>
                            <Stack gap={4}>
                                <Li name={"midterm y2/1"}></Li>
                                <Li name={"Network"}></Li>
                                <Li name={"Algo p1"}></Li>
                                <Li name={"Java"}></Li>
                                <Li name={"midterm y2/1"}></Li>
                                <Li name={"Network"}></Li>
                                <Li name={"Algo p1"}></Li>
                                <Li name={"Java"}></Li>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter></DrawerFooter>
                    </DrawerContent>
                </Drawer>
                {/*
                <Link to={"./library"}>
                    <Button boxShadow={"md"} colorScheme="orange" size={"md"}>
                        My library
                    </Button>
                </Link>
                */}
            </Flex>
            <Box mt={4} mb={12}>
                <SimpleGrid columns={3} gap={6} textAlign={"center"}>
                    <Rsn topic={"Shortnote 001"}></Rsn>
                    <Rsn topic={"Shortnote 002"}></Rsn>
                    <Rsn topic={"Shortnote 003"}></Rsn>
                </SimpleGrid>
            </Box>

            {/*Shortnote list section*/}
            <Flex alignItems={"end"}>
                <Button colorScheme={"orange"} onClick={nsOnOpen}>
                    New shortnote
                </Button>
                <Modal size={"xl"} onClose={closeSnModal} isOpen={nsIsOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create new shortnote</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid templateColumns="repeat(3, 1fr)">
                                <Spacer />
                                <GridItem colSpan={1}>
                                    <Flex justifyContent={"center"}>
                                        <Box w={"60%"}>
                                            <Select variant="filled" placeholder="Course" size={"sm"} rounded={4}>
                                                <option value="option1">CSC218</option>
                                                <option value="option2">MTH1</option>
                                            </Select>
                                        </Box>
                                    </Flex>
                                </GridItem>
                                <Spacer />
                                <GridItem colSpan={3}>
                                    <Box>
                                        <Text>Name</Text>
                                        <Input variant="outline" placeholder="" />
                                    </Box>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <Box>
                                        <Text>Description</Text>
                                        <Textarea placeholder="" h={200} />
                                    </Box>
                                </GridItem>
                                <Spacer />
                                <GridItem colSpan={1}>
                                    <RadioGroup defaultValue="TRUE" mt={4}>
                                        <Stack spacing={5} direction="row">
                                            <Box
                                                onClick={() => {
                                                    setRadio("Public")
                                                }}
                                            >
                                                <Radio colorScheme="orange" value="TRUE">
                                                    Public
                                                </Radio>
                                            </Box>
                                            <Spacer />
                                            <Box
                                                onClick={() => {
                                                    setRadio("Private")
                                                }}
                                            >
                                                <Radio colorScheme="orange" value="FALSE">
                                                    Private
                                                </Radio>
                                            </Box>
                                        </Stack>
                                    </RadioGroup>
                                </GridItem>
                                <Spacer />
                            </Grid>

                            <Box>
                                {useRadio == "Private" ? (
                                    <Box>
                                        Add people
                                        <br />
                                        <Button colorScheme={"orange"} rounded={"full"} boxShadow="xl">
                                            +
                                        </Button>
                                    </Box>
                                ) : null}
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="orange" w={"100%"}>
                                Create
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {/*
                <Link to={"./newShortnote"}>
                    <Button boxShadow={"md"} colorScheme="orange" size={"md"}>
                        New shortnote
                    </Button>
                </Link>
                */}
                <Spacer />
                <Stack direction={"row"}>
                    <VStack>
                        <Text alignSelf={"start"}>Sort by</Text>
                        <Select variant="filled" placeholder="None">
                            <option value="option1">Name</option>
                            <option value="option2">Date</option>
                        </Select>
                    </VStack>
                    <VStack>
                        <Text alignSelf={"start"}>Course</Text>
                        <Select variant="filled" placeholder="All">
                            <option value="option1">CSC218</option>
                            <option value="option2">CSC220</option>
                            <option value="option3">MTH110</option>
                        </Select>
                    </VStack>
                </Stack>
            </Flex>
            <VStack gap={2} pt={4}>
                <Sn topic={"Shortnote 001"} course={"SNS001"} date={"16/04/46"} lock={"🔒"}></Sn>
                <Sn topic={"Datalink layer"} course={"CSC220"} date={"22/07/19"} lock={""}></Sn>
                <Sn topic={"Basic java programigng"} course={"CSC110"} date={"05/12/22"} lock={""}></Sn>
                <Sn topic={"Shortnote 001"} course={"SNS001"} date={"16/04/46"} lock={"🔒"}></Sn>
                <Sn topic={"Datalink layer"} course={"CSC220"} date={"22/07/19"} lock={"🔒"}></Sn>
                <Sn topic={"Basic java programigng"} course={"CSC110"} date={"05/12/22"} lock={""}></Sn>
            </VStack>
        </AppBody>
    )
}

export default index
