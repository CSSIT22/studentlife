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
import Li from "./liList"

const btnMyLibrary = () => {
    const { isOpen: mlIsOpen, onOpen: mlOnOpen, onClose: mlOnClose } = useDisclosure()
    const { isOpen: nlIsOpen, onOpen: nlOnOpen, onClose: nlOnClose } = useDisclosure()

    return (
        <Box>
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
        </Box>
    )
}

export default btnMyLibrary
