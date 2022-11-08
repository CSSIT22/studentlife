import React from "react"
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
import AppBody from "../../components/share/app/AppBody"
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons"
import { HiDotsHorizontal } from "react-icons/hi"
import CmList from "../../components/shortnotes/cmList"

const snDetail = () => {
    return (
        <AppBody>
            <Grid templateColumns="repeat(14, 1fr)" bg={"white"} boxShadow={"xl"} rounded={8} mb={4}>
                <Spacer />
                <GridItem colSpan={12} py={6}>
                    <HStack>
                        <Heading size={"lg"} mb={1}>
                            Shortnote name
                        </Heading>
                        <Spacer />
                        <Menu>
                            <MenuButton as={IconButton} aria-label="Options" icon={<HiDotsHorizontal />} variant="ghost" />
                            <MenuList>
                                <MenuItem>Add to library</MenuItem>
                                <MenuItem>Upload file</MenuItem>
                                <MenuItem>Delete</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>

                    <Heading size={"sm"} bg={"orange"} rounded={8} w={20} py={1} textAlign={"center"} mb={4} boxShadow={"xl"}>
                        CSC213
                    </Heading>
                    <Box mb={4}>
                        <Heading size={"md"}>Description</Heading>
                        <Text>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ut cumque consequuntur vel, inventore hic suscipit
                            perspiciatis at non! Sequi autem earum odio rem ipsum voluptatibus officia molestiae pariatur culpa!Lorem ipsum dolor sit,
                            amet consectetur adipisicing elit. Debitis ut cumque consequuntur vel, inventore hic suscipit perspiciatis at non! Sequi
                            autem earum odio rem ipsum voluptatibus officia molestiae pariatur culpa!{" "}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size={"md"}>Link</Heading>
                        <Text>modlink.me/shortnote/filename.pdf</Text>
                    </Box>
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(14, 1fr)" bg={"white"} boxShadow={"xl"} rounded={8}>
                <Spacer />
                <GridItem colSpan={12} py={6}>
                    <Heading size={"md"} mb={1}>
                        Comments
                    </Heading>

                    <Textarea h={150} mb={2} py={4} placeholder={"What are your thought..."} />
                    <Flex direction={"row"} justifyContent={"end"}>
                        <Button colorScheme={"orange"}>Comment</Button>
                    </Flex>
                    <VStack gap={4}>
                        <CmList
                            name={"firstname lastname"}
                            desc={
                                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ab at quibusdam dicta nulla ipsum in sequi, enim modiNon, id! Quae illo iste id cum quia aut doloribus eligendi"
                            }
                        />
                        <CmList
                            name={"firstname lastname"}
                            desc={
                                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ab at quibusdam dicta nulla ipsum in sequi, enim modiNon, id! Quae illo iste id cum quia aut doloribus eligendi"
                            }
                        />
                        <CmList
                            name={"firstname lastname"}
                            desc={
                                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ab at quibusdam dicta nulla ipsum in sequi, enim modiNon, id! Quae illo iste id cum quia aut doloribus eligendi"
                            }
                        />
                    </VStack>
                </GridItem>
            </Grid>
        </AppBody>
    )
}

export default snDetail
