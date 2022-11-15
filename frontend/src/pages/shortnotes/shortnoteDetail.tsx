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
import SnDetail from "../../components/shortnotes/snDetail"
import { BiDownArrow, BiDownvote, BiUpArrow, BiUpvote } from "react-icons/bi"

const snDetail = () => {
    return (
        <AppBody>
            <Grid templateColumns="repeat(12, 1fr)" bg={"white"} boxShadow={"xl"} rounded={8} mb={4}>
                {/* <Spacer /> */}
                <GridItem colSpan={12} p={6}>
                    <SnDetail
                        topic={"Shortnote name"}
                        course={"CSC213"}
                        desc={
                            " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum sint, odio ut praesentium explicabo hic harum voluptatem veniam architecto, recusandae, nisi aliquid? Fuga placeat dolore voluptates eligendi ut, aut dignissimos."
                        }
                        link={"modlink.me/shortnote/filename.pdf"}
                        owner={"Shortnote Shotenot"}
                    />
                </GridItem>
                {/* <Spacer /> */}
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" bg={"white"} boxShadow={"xl"} rounded={8}>
                {/* <Spacer /> */}
                <GridItem colSpan={12} p={6}>
                    <Box mb={4} boxShadow={"base"} rounded={8} p={4}>
                        <Box>
                            <Heading size={"md"} mb={1}>
                                Comments
                            </Heading>
                            <Textarea h={150} mb={2} py={4} placeholder={"What are your thoughts ?"} />
                            <Flex direction={"row"} justifyContent={"end"}>
                                <Button colorScheme={"orange"}>Comment</Button>
                            </Flex>
                        </Box>
                    </Box>

                    <VStack gap={4}>
                        <CmList
                            name={"Firstname Lastname"}
                            desc={
                                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ab at quibusdam dicta nulla ipsum in sequi, enim modiNon, id! Quae illo iste id cum quia aut doloribus eligendi"
                            }
                        />
                        <CmList
                            name={"Firstname Lastname"}
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
