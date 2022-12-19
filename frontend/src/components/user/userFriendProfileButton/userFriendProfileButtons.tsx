import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavigateFunction, useParams } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Checkbox,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import { BsThreeDotsVertical, BsFillFlagFill, BsXOctagonFill, BsHandIndexThumbFill } from "react-icons/bs";
import API from "src/function/API";
import { userData } from "src/pages/groups/data";

// follow, message, 3 dots

export function userFriendProfileButtons(onOpen: () => void, initialRef: React.MutableRefObject<null>, finalRef: React.MutableRefObject<null>, onClose: () => void, isOpen: boolean, navigate: NavigateFunction) {

    const [reason, setReason] = useState<string>()
    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure()
    const { isOpen: isConfirmRPModalOpen, onOpen: onConfirmRPModalOpen, onClose: onConfirmRPModalClose } = useDisclosure()
    const { isOpen: isBlockModalOpen, onOpen: onBlockModalOpen, onClose: onBlockModalClose } = useDisclosure()
    const { isOpen: isPokeModalOpen, onOpen: onPokeModalOpen, onClose: onPokeModalClose } = useDisclosure()
    const { isOpen: isFriendListOpen, onOpen: onFriendListopen, onClose: onFriendListClose } = useDisclosure()
    const [isFollow, setIsFollow] = useState<boolean>()
    const [followerCount, setFollowerCount] = useState<number>(0)
    const [block, setblock] = useState<any>()
    const [follow, setfollow] = useState<any>()

    const param = useParams()

    function followHandler(user_block: any) {
        setfollow(user_block)
    }

    function followerHandler() {
        API.post(`/user/profile/insertfollow/${param.userID}`).then().catch(err => console.error(err))
    }

    function blockHandler(user_block: any) {
        setblock(user_block)
    }

    function submitHandler() {
        API.post(`/user/profile/blockuser/${param.userID}`).then().catch(err => console.error(err))

    }

    async function handleClickFollow() {
        setIsFollow(!isFollow)
        await followerHandler()
    }

    function setIsFolCount(arg0: any) {
        throw new Error("Function not implemented.");
    }

    function handleReport() {
        const arr = window.location.href.split("/")
        const userId = arr[arr.length - 1]
        API.post('/backendService/banuser', {
            data: {
                bannedUserId: userId,
                reason: reason
            }
        }).then().catch(err => console.error(err))
    }

    return (

        <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
            <HStack position="initial">
                {/* FOLLOW BUTTON */}
                <motion.div whileHover={{ scale: 0.9 }}>
                    <Button
                        _hover={{ cursor: "pointer", background: "orange.200" }}
                        onClick={() => {
                            handleClickFollow()
                        }}
                        pl={5}
                        width={{ lg: "6rem", base: "" }}
                        height={{ xl: "3rem", lg: "2.5rem", base: "2rem" }}
                        fontSize={{ base: "", lg: "lg" }}
                        bg="orange.600"
                        position="initial"
                        value="inside"
                        shadow={"lg"}
                    >
                        Follow
                    </Button>
                </motion.div>
                {/* FOLLOW BUTTON */}
            </HStack>
            {/* MESSAGE BUTTON */}
            <motion.div whileHover={{ scale: 0.9 }}>
                <Button
                    pl={5}
                    bg="orange.600"
                    _hover={{ background: "orange.200" }}
                    width={{ lg: "6rem", base: "" }}
                    height={{ xl: "3rem", lg: "2.5rem", base: "2rem" }}
                    fontSize={{ base: "", lg: "lg" }}
                    position="initial"
                    value="inside"
                    shadow={"lg"}
                    onClick={() => API.post(`/chat/createRoom`, { chatWith_id: param.userID }).then(() => navigate("/chat"))}
                >
                    Message
                </Button>
            </motion.div>{" "}
            {/* MESSAGE BUTTON */}

            {/* MENU 3 DOTS */}
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
                        height={{ xl: "3rem", lg: "2.5rem", base: "2rem" }}
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
                        <ModalContent>``
                            <ModalHeader>REPORT</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormLabel>Why are you reporting this account?</FormLabel>
                                <RadioGroup onChange={setReason} value={reason}>
                                    <Stack spacing={5} direction="column">
                                        <Radio colorScheme="orange" value="Post inappropriate content">Post inappropriate content</Radio>
                                        <Radio colorScheme="orange" value="Making anxious/guilty">Making anxious/guilty</Radio>
                                        <Radio colorScheme="orange" value="Toxic">Toxic</Radio>
                                        <Radio colorScheme="orange" value="Bullying">Bullying</Radio>
                                        <Radio colorScheme="orange" value="Harassment">Harassment</Radio>
                                    </Stack>
                                </RadioGroup>
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
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                colorScheme="orange"
                                                mr={3}
                                                onClick={() => {
                                                    handleReport()
                                                    onReportModalClose()
                                                    onConfirmRPModalClose()
                                                }}
                                            >
                                                Report
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
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
                            <form onSubmit={(e) => { submitHandler() }}>
                                <ModalFooter>
                                    <Button type="submit" colorScheme="orange" mr={3} onClick={() => {
                                        blockHandler
                                        onBlockModalClose()
                                        onConfirmRPModalClose()
                                    }}>
                                        Block
                                    </Button>
                                    <Button variant="ghost" onClick={onBlockModalClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>
                </MenuList>
            </Menu>
            {/* MENU 3 DOTS */}
        </ButtonGroup>
    )
}
