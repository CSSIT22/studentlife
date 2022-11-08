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
import { MdPostAdd } from "react-icons/md"

const btnNewShortnote = () => {
    const { isOpen: nsIsOpen, onOpen: nsOnOpen, onClose: nsOnClose } = useDisclosure()

    const [useRadio, setRadio] = useState("Public")
    const closeSnModal = () => {
        nsOnClose()
        setRadio("Public")
    }
    return (
        <Box>
            <Button colorScheme={"orange"} onClick={nsOnOpen}>
                <MdPostAdd /> New shortnote
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
        </Box>
    )
}

export default btnNewShortnote
