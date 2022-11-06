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
import React from "react"
import { Link } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"
import ResentLists from "../../components/shortnotes/index/rsnList"
import ShortnoteLists from "../../components/shortnotes/index/snList"
import LiList from "../../components/shortnotes/library/liList"

const index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: mIsOpen, onOpen: mOnOpen, onClose: mOnClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <AppBody>
            {/*Recent view list section*/}
            <Flex mt={10}>
                <Text alignSelf={"end"}>Recent view</Text>
                <Spacer />
                <Button colorScheme="orange" onClick={onOpen}>
                    My library
                </Button>
                <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Heading size={"lg"}> My library</Heading>
                        </DrawerHeader>
                        <DrawerBody>
                            <Stack gap={4}>
                                <LiList name={"midterm y2/1"}></LiList>
                                <LiList name={"Network"}></LiList>
                                <LiList name={"Algo p1"}></LiList>
                                <LiList name={"Java"}></LiList>
                                <LiList name={"midterm y2/1"}></LiList>
                                <LiList name={"Network"}></LiList>
                                <LiList name={"Algo p1"}></LiList>
                                <LiList name={"Java"}></LiList>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter>
                            <Link to={"./library/newLibrary"}>
                                <Button colorScheme="orange">New library</Button>
                            </Link>
                        </DrawerFooter>
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
                    <ResentLists topic={"Shortnote 001"}></ResentLists>
                    <ResentLists topic={"Shortnote 002"}></ResentLists>
                    <ResentLists topic={"Shortnote 003"}></ResentLists>
                </SimpleGrid>
            </Box>

            {/*Shortnote list section*/}
            <Flex alignItems={"end"}>
                <Button colorScheme={"orange"} onClick={mOnOpen}>
                    New shortnote
                </Button>
                <Modal size={"xl"} onClose={mOnClose} isOpen={mIsOpen} isCentered>
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
                                                <option value="option2">MTH110</option>
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
                                            <Radio colorScheme="orange" value="TRUE">
                                                Public
                                            </Radio>
                                            <Spacer />
                                            <Radio colorScheme="orange" value="FALSE">
                                                Private
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                </GridItem>
                            </Grid>
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
                <ShortnoteLists topic={"Shortnote 001"} course={"SNS001"} date={"16/04/46"} lock={"🔒"}></ShortnoteLists>
                <ShortnoteLists topic={"Datalink layer"} course={"CSC110"} date={"22/07/19"} lock={"🔒"}></ShortnoteLists>
                <ShortnoteLists topic={"Basic java programigng"} course={"course"} date={"05/12/22"} lock={"🔒"}></ShortnoteLists>
            </VStack>
        </AppBody>
    )
}

export default index
