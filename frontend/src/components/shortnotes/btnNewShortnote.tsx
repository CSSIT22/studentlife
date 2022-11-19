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
    Collapse,
    useBoolean,
    Hide,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { MdPostAdd } from "react-icons/md"

const btnNewShortnote = () => {
    const { isOpen: nsIsOpen, onOpen: nsOnOpen, onClose: nsOnClose } = useDisclosure()

    const [useRadio, setRadio] = useState("Public")
    const closeSnModal = () => {
        nsOnClose()
        setRadio("Public")
        setFlag.off()
        setPeoples([])
    }

    const [flag, setFlag] = useBoolean()
    const setPrivate = () => {
        setRadio("Private")
        setFlag.on()
    }
    async function setPublic() {
        await setFlag.off()
        setRadio("Public")
    }

    const [pName, setName] = useState("")
    const [people, setPeoples] = useState<string[]>([])

    const course = ["CSC210", "CSC213", "CSC218", "CSC220", "CSC110", "MTH110"]

    return (
        <Box>
            <Button colorScheme={"orange"} onClick={nsOnOpen}>
                <MdPostAdd /> New <Hide below="sm">shortnote</Hide>
            </Button>
            <Modal scrollBehavior={"inside"} size={"xl"} onClose={closeSnModal} isOpen={nsIsOpen} isCentered>
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
                                            {course.map((course, key) => (
                                                <option value={course}>{course}</option>
                                            ))}
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
                                        <Box onClick={setPublic}>
                                            <Radio colorScheme="orange" value="TRUE">
                                                Public
                                            </Radio>
                                        </Box>
                                        <Spacer />
                                        <Box onClick={setPrivate}>
                                            <Radio colorScheme="orange" value="FALSE">
                                                Private
                                            </Radio>
                                        </Box>
                                    </Stack>
                                </RadioGroup>
                            </GridItem>
                            <Spacer />
                        </Grid>

                        <Collapse in={flag} animateOpacity>
                            <Box>
                                {useRadio == "Private" ? (
                                    <Box>
                                        Add people
                                        <br />
                                        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                                            <GridItem colSpan={4}>
                                                <Input
                                                    placeholder="studentID, comma seperated"
                                                    value={pName}
                                                    onChange={(e) => setName(e.target.value)}
                                                ></Input>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <Button
                                                    colorScheme={"orange"}
                                                    rounded={8}
                                                    w={"100%"}
                                                    onClick={() => {
                                                        let newPeople = [pName, ...people] //add to begin
                                                        setPeoples(newPeople)
                                                        setName("")
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </GridItem>
                                        </Grid>
                                        <VStack gap={2} mt={4} mb={4}>
                                            {people.map((people, key) => (
                                                <Box bg={"white"} boxShadow={"base"} rounded={8} key={key} w={"100%"} p={3}>
                                                    {people}
                                                </Box>
                                            ))}
                                        </VStack>
                                    </Box>
                                ) : null}
                            </Box>
                        </Collapse>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="orange" w={"100%"}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default btnNewShortnote
