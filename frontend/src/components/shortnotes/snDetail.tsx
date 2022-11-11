import React, { FC } from "react"
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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    IconButton,
} from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi"
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai"
import { MdDeleteOutline } from "react-icons/md"
import { BiDownArrow, BiLibrary, BiUpArrow } from "react-icons/bi"
import LiList from "./liList"
import { useNavigate } from "react-router-dom"
import search from "src/pages/restaurant/search"

const liList: FC<{
    topic: String
    course: String
    desc: String
    link: String
    user: String
}> = ({ topic, course, desc, link, user }) => {
    const { isOpen: mliIsOpen, onOpen: mliOnOpen, onClose: mliOnClose } = useDisclosure()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
    const goToUpload = () => {
        navigate({
            pathname: "../../airdrop",
            search: "?type=shortnotes",
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
                        <MenuItem icon={<AiOutlineUpload />} onClick={goToUpload}>
                            Upload file
                        </MenuItem>
                        <MenuItem icon={<MdDeleteOutline />} onClick={onOpen}>
                            Delete
                        </MenuItem>
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
                <Text>{link}</Text>
            </Box>
            <HStack>
                <HStack>
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
                        <Text fontSize={"30px"}>
                            <BiDownArrow />
                        </Text>
                    </Box>
                </HStack>
                <Spacer />
                <Text fontSize={"xs"}>Posted by {user}</Text>
            </HStack>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete shortnote</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to delete this shortnote?</ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} colorScheme={"red"}>
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
                            {/*<Link to={"./library/newLibrary"}>
                                    <Button colorScheme="orange">New library</Button>
                                </Link>*/}
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack gap={4}>
                            <LiList name={"Network"}></LiList>
                            <LiList name={"Algo p1"}></LiList>
                            <LiList name={"Java"}></LiList>
                            <LiList name={"midterm y2/1"}></LiList>
                            <LiList name={"Network"}></LiList>
                            <LiList name={"Algo p1"}></LiList>
                            <LiList name={"Java"}></LiList>
                            <LiList name={"Algo p1"}></LiList>
                            <LiList name={"Java"}></LiList>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default liList
