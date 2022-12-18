import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavigateFunction } from "react-router-dom";
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
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import { BsThreeDotsVertical, BsFillFlagFill, BsXOctagonFill, BsHandIndexThumbFill } from "react-icons/bs";
import API from "src/function/API";
import { userData } from "src/pages/groups/data";

// follow, message, 3 dots

export function userFriendProfileButtons(onOpen: () => void, initialRef: React.MutableRefObject<null>, finalRef: React.MutableRefObject<null>, onClose: () => void, isOpen: boolean, navigate: NavigateFunction) {

    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure()
    const { isOpen: isConfirmRPModalOpen, onOpen: onConfirmRPModalOpen, onClose: onConfirmRPModalClose } = useDisclosure()
    const { isOpen: isBlockModalOpen, onOpen: onBlockModalOpen, onClose: onBlockModalClose } = useDisclosure()
    const { isOpen: isPokeModalOpen, onOpen: onPokeModalOpen, onClose: onPokeModalClose } = useDisclosure()
    const { isOpen: isFriendListOpen, onOpen: onFriendListopen, onClose: onFriendListClose } = useDisclosure()
    const [isFollow, setIsFollow] = useState<boolean>()

    function handleClickFollow() {
        if (isFollow) {
            setIsFollow(!isFollow)
        } else {
            setIsFollow(!isFollow)
        }
    }

    function setIsFolCount(arg0: any) {
        throw new Error("Function not implemented.");
    }

    function onReportModalClose(): void {
        throw new Error("Function not implemented.");
    }

    function onConfirmRPModalClose(): void {
        throw new Error("Function not implemented.");
    }

    function onBlockModalClose(): void {
        throw new Error("Function not implemented.");
    }

    function onPokeModalClose(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
            <HStack position="initial">
                <motion.div whileHover={{ scale: 0.9 }}>
                    <Button
                        _hover={{ cursor: "pointer", background: "orange.200" }}
                        onClick={() => {
                            handleClickFollow()
                            setIsFolCount(FolCount + 1)
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
            </HStack>
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
                    onClick={() => API.post(`/chat/createRoom`, { chatWith_id: userData.userId }).then(() => navigate("/chat"))}
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
    )
}