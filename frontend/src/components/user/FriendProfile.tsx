import React, { useContext, useState, useEffect } from "react"
import { ReactElement } from "react"
import { motion } from "framer-motion"
import FriendList from "../user/FriendList"
import {
    Box,
    Avatar,
    VStack,
    Grid,
    GridItem,
    Button,
    ButtonGroup,
    IconButton,
    Stack,
    Text,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    extendTheme,
    HStack,
    Link,
} from "@chakra-ui/react"

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { BsThreeDotsVertical, BsFillFlagFill, BsXOctagonFill, BsHandIndexThumbFill } from "react-icons/bs"
import { useParams, useNavigate } from "react-router-dom"
import API from "src/function/API"

export default function SimpleThreeColumns() {
    const navigate = useNavigate();
    const param = useParams();
    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure()
    const { isOpen: isConfirmRPModalOpen, onOpen: onConfirmRPModalOpen, onClose: onConfirmRPModalClose } = useDisclosure()
    const { isOpen: isBlockModalOpen, onOpen: onBlockModalOpen, onClose: onBlockModalClose } = useDisclosure()
    const { isOpen: isPokeModalOpen, onOpen: onPokeModalOpen, onClose: onPokeModalClose } = useDisclosure()
    const { isOpen: isFriendListOpen, onOpen: onFriendListopen, onClose: onFriendListClose } = useDisclosure()
    const btnRef = React.useRef(null)
    const [isFollow, setIsFollow] = useState(true)

    const [userData, setUserData] = useState({
        userId: "",
        studentId: "",
        username: "",
        fName: "",
        lName: "",
        email: "",
        image: "",
        majorId: "",
    })


    useEffect(() => {
        async function fetch() {
            const res = await API.get(`/user/friendprofile/${param.userID}`);
            setUserData({ ...res.data.user, image: btoa(String.fromCharCode(...new Uint8Array(res.data.user.image.data))) });
        }

        fetch();
    }, [])

    function handleClick() {
        setIsFollow(!isFollow)
    }



    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [FolCount, setIsFolCount] = useState(0)

    const breakpoints = {
        sm: "400px",
        md: "800px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    const theme = extendTheme({ breakpoints })

    return (
        <Box maxW="100%" borderRadius="none" rounded="2xl" overflow="hidden" p={5} pt={{ md: "45px", base: "0" }} ml={{ base: "3", md: "0" }}>
            <Grid
                templateAreas={{
                    base: `
                "nav main "
                "nav followlist"
                "nav footer"`,
                    md: `
                  "nav main followlist"
                  "nav main footer"`,
                }}
                gridTemplateRows={{ base: "80% 1fr 50%", md: "70% 1fr 50%" }}
                gridTemplateColumns={"20% 1fr"}
                h="100%"
                gap="2"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="md"
                bg={{ base: "", md: "white" }}
                shadow={{ base: "", md: "lg" }}
            >
                <GridItem rounded="xl" area={"nav"} mt={5}>
                    <VStack align="stretch" alignItems="center" ml={7}>
                        <motion.div animate={{ rotate: 360 }} transition={{ type: "spring", duration: 2, bounce: 0.6 }}>
                            <Avatar
                                pt={2}
                                mt={{ md: "-70px", base: "0" }}
                                display="flex"
                                position="initial"
                                float={"inline-end"}
                                size={{ md: "3xl", base: "2xl" }}
                                shadow="xl"
                                // name="Christian Nwamba"
                                // src="https://bit.ly/code-beast"
                                src={`data:image/png;base64,${userData.image}`}
                            />
                        </motion.div>{" "}
                        <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" mt={{ base: "3", md: "0", lg: "15" }} ml={{ base: "10", lg: "" }} alignSelf={"end"} area={"main"} color="gray.700">
                    <HStack p={1} ml="3">
                        <Box fontSize={{ lg: "md", base: "sm" }} color="orange.700">
                            ID :
                        </Box>
                        <Box fontSize={{ lg: "lg", base: "md" }}>{userData.studentId}</Box>
                    </HStack>

                    <Stack p={1} direction={{ base: "column", md: "row" }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 20,
                            }}
                        >
                            <Box fontSize={{ lg: "5xl", base: "xl" }}>{`${userData.fName} ${userData.lName}`}</Box>
                        </motion.div>
                    </Stack>

                    <Stack direction={{ base: "column", lg: "row" }} alignItems="flex-start" spacing={-0.5} mb="5">
                        <Stack p={1} direction="row" alignItems="center">
                            <Box fontSize={{ base: "sm", lg: "lg" }} display={{ base: "block", lg: "none" }} color="orange.700">
                                Faculty :
                            </Box>
                            <Box fontSize={{ base: "md", lg: "xl" }}>SIT</Box>
                            <Box fontSize={{ base: "lg", lg: "lg" }} display={{ base: "none", lg: "block" }} color="orange.700">
                                ,
                            </Box>
                        </Stack>

                        <Stack
                            p={1}
                            direction={{ base: "row", lg: "row" }}
                            alignItems={{ base: "center", md: "flex-start", lg: "center" }}
                            spacing={{ base: "2", md: "2", lg: "2" }}
                        >
                            <Box fontSize={{ base: "sm", lg: "lg" }} display={{ base: "block", lg: "none" }} color="orange.700">
                                Major :
                            </Box>
                            <Box fontSize={{ base: "md", lg: "xl" }}>{userData.majorId}</Box>
                        </Stack>
                    </Stack>
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl" ml={{ base: "0", md: "2", lg: "6" }}>
                    <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
                        <HStack position="initial">
                            {isFollow ? (
                                <motion.div whileHover={{ scale: 0.9 }}>
                                    <Button
                                        _hover={{ cursor: "pointer", background: "orange.200" }}
                                        onClick={() => {
                                            handleClick()
                                            setIsFolCount(FolCount + 1)
                                        }}
                                        pl={5}
                                        width={{ lg: "7rem", base: "" }}
                                        height={{ lg: "3rem", base: "2rem" }}
                                        fontSize={{ base: "", lg: "lg" }}
                                        bg="orange.600"
                                        position="initial"
                                        value="inside"
                                        shadow={"lg"}
                                    >
                                        Follow
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div whileHover={{ scale: 0.9 }}>
                                    <Button
                                        _hover={{ cursor: "pointer", background: "" }}
                                        onClick={() => {
                                            handleClick()
                                            setIsFolCount(FolCount - 1)
                                        }}
                                        shadow={"lg"}
                                        colorScheme="orange"
                                        variant="outline"
                                        pl={5}
                                        width={{ lg: "7rem", base: "" }}
                                        height={{ lg: "3rem", base: "2rem" }}
                                        fontSize={{ base: "", lg: "lg" }}
                                        position="initial"
                                        value="inside"
                                    >
                                        Following
                                    </Button>
                                </motion.div>
                            )}
                        </HStack>
                        <motion.div whileHover={{ scale: 0.9 }}>
                            <Button
                                pl={5}
                                bg="orange.600"
                                _hover={{ background: "orange.200" }}
                                width={{ lg: "7rem", base: "" }}
                                height={{ lg: "3rem", base: "2rem" }}
                                fontSize={{ base: "", lg: "lg" }}
                                position="initial"
                                value="inside"
                                shadow={"lg"}
                                onClick={() => navigate("/chat")}
                            >
                                Message
                            </Button>
                        </motion.div>{" "}
                        <Menu>
                            <motion.div whileHover={{ scale: 0.9 }}>
                                <MenuButton
                                    alignContent={"center"}
                                    as={IconButton}
                                    bgColor={{ base: "white", md: "orange.600" }}
                                    icon={<BsThreeDotsVertical />}
                                    color={{ base: "orange.600", md: "white" }}
                                    aria-label="Options"
                                    _hover={{ background: "orange.200" }}
                                    position="initial"
                                    variant="solid"
                                    shadow={"lg"}
                                    width={{ lg: "2rem", base: "" }}
                                    height={{ lg: "3rem", base: "2rem" }}
                                    fontSize={{ base: "", lg: "lg" }}
                                    bg="orange.600"
                                    value="inside"
                                />
                            </motion.div>
                            <MenuList>
                                <MenuItem color="orange.700" icon={<BsFillFlagFill />} onClick={onReportModalOpen}>
                                    Report
                                </MenuItem>

                                <Modal
                                    initialFocusRef={initialRef}
                                    finalFocusRef={finalRef}
                                    isOpen={isReportModalOpen}
                                    onClose={onReportModalClose}
                                    motionPreset="slideInBottom"
                                >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>REPORT</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}>
                                            <FormLabel>Why are you reporting this account?</FormLabel>
                                            <Stack spacing={5} direction="column">
                                                <Checkbox colorScheme="orange">Post inappropriate content</Checkbox>
                                                <Checkbox colorScheme="orange">Making anxious/guilty</Checkbox>
                                                <Checkbox colorScheme="orange">Toxic</Checkbox>
                                                <Checkbox colorScheme="orange">Bullying</Checkbox>
                                                <Checkbox colorScheme="orange">Harassment</Checkbox>
                                            </Stack>

                                            <FormControl mt={4}>
                                                <FormLabel>Other :</FormLabel>
                                                <Input placeholder="Details" />
                                            </FormControl>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme="orange" mr={3} _hover={{ background: "orange.200" }} onClick={onConfirmRPModalOpen}>
                                                Report
                                            </Button>
                                            <Modal isCentered isOpen={isConfirmRPModalOpen} onClose={onConfirmRPModalClose}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Are you sure to report this account?</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Text></Text>
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <Button
                                                            colorScheme="orange"
                                                            mr={3}
                                                            onClick={() => {
                                                                onReportModalClose()
                                                                onConfirmRPModalClose()
                                                            }}
                                                        >
                                                            Report
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => {
                                                                onReportModalClose()
                                                                onConfirmRPModalClose()
                                                            }}
                                                        >
                                                            Close
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>

                                            <Button onClick={onReportModalClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                <MenuItem color="orange.700" icon={<BsXOctagonFill />} onClick={onBlockModalOpen}>
                                    Block
                                </MenuItem>
                                <Modal isCentered isOpen={isBlockModalOpen} onClose={onBlockModalClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Are you sure to block this account?</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Text></Text>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme="orange" mr={3} onClick={onBlockModalClose}>
                                                Block
                                            </Button>
                                            <Button variant="ghost" onClick={onBlockModalClose}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                <MenuItem color="orange.700" icon={<BsHandIndexThumbFill />} onClick={onPokeModalOpen}>
                                    Poke
                                </MenuItem>
                                <Modal isCentered isOpen={isPokeModalOpen} onClose={onPokeModalClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Are you sure to poke this account?</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Text></Text>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme="orange" mr={3} onClick={onPokeModalClose}>
                                                Poke
                                            </Button>
                                            <Button variant="ghost" onClick={onPokeModalClose}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </MenuList>
                        </Menu>
                    </ButtonGroup>
                </GridItem>
                <GridItem rounded="xl" area={"followlist"} mt={{ base: "-2rem", md: "3rem" }} mr={5}>
                    <Stack direction="row" mx={{ base: "50", lg: "" }} spacing={{ base: "", md: "" }}>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-1.5", md: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>{FolCount}</Box>
                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700">
                                    Follower
                                </Box>

                                <Modal onClose={onFriendListClose} finalFocusRef={btnRef} isOpen={isFriendListOpen}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Follower</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody rounded="xl">
                                            <FriendList />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onFriendListClose} display={{ base: "none", md: "block" }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Link>
                        </Stack>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-3.5", lg: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>0</Box>

                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700" mt="0.5rem">
                                    Following
                                </Box>

                                <Modal onClose={onFriendListClose} finalFocusRef={btnRef} isOpen={isFriendListOpen}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Following</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody rounded="xl">
                                            <FriendList />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onFriendListClose} display={{ base: "none", md: "block" }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Link>
                        </Stack>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>

        // Help me goddddd it almost finish but my eyes can handle much any more sorry for what i done this is the end of me nowww thank you everyone for support me and help me love you mom dad and my bro sry to be a
        // croward is sorry

    )
}
