import React, { useState } from "react"
import { ReactElement } from "react"
import FriendList from "../user/FriendList"
import {
    Box,
    Avatar,
    VStack,
    Grid,
    GridItem,
    Button,
    ButtonGroup,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Stack,
    Flex,
    Text,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    CheckboxGroup,
    useToast,
    AlertDialogCloseButton,
    extendTheme,
    useEditableControls,
    HStack,
    useBoolean,
    Link,
} from "@chakra-ui/react"

import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react"

import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from "@chakra-ui/react"

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { BsThreeDotsVertical, BsFillFlagFill, BsXOctagonFill, BsHandIndexThumbFill } from "react-icons/bs"

import { Editable, EditableInput, EditableTextarea, EditablePreview } from "@chakra-ui/react"

export default function SimpleThreeColumns() {
    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure()
    const { isOpen: isConfirmRPModalOpen, onOpen: onConfirmRPModalOpen, onClose: onConfirmRPModalClose } = useDisclosure()
    const { isOpen: isBlockModalOpen, onOpen: onBlockModalOpen, onClose: onBlockModalClose } = useDisclosure()
    const { isOpen: isPokeModalOpen, onOpen: onPokeModalOpen, onClose: onPokeModalClose } = useDisclosure()

    const { isOpen: isFriendListOpen, onOpen: onFriendListopen, onClose: onFriendListClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState("inside")
    const btnRef = React.useRef(null)

    const [isFollow, setIsFollow] = useState(true)

    function handleClick() {
        setIsFollow(!isFollow)
    }

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const cancelRef = React.useRef()

    const [FolCount, setIsFolCount] = useState(0)

    const toast = useToast()
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
                        <Avatar
                            pt={2}
                            mt={{ md: "-70px", base: "0" }}
                            display="flex"
                            position="initial"
                            float={"inline-end"}
                            size={{ md: "3xl", base: "2xl" }}
                            shadow="xl"
                            name="Christian Nwamba"
                            src="https://bit.ly/code-beast"
                        />{" "}
                        <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" mt={15} ml={{ base: "10", md: "" }} alignSelf={"end"} area={"main"} color="gray.700">
                    <HStack p={1}>
                        <Box fontSize={"lg"} color="orange.700">
                            ID :
                        </Box>
                        <Box fontSize={"xl"}>64130500XXX</Box>
                    </HStack>

                    <Stack p={1} direction={{ base: "column", lg: "row" }}>
                        <Box fontSize={{ md: "5xl", base: "xl" }}>Vatcharamai Rodring</Box>
                    </Stack>

                    <Stack direction={{ base: "column", lg: "row" }} alignItems="flex-start" spacing={-0.5} mb="5">
                        <Stack p={1} direction="row" alignItems="center">
                            <Box fontSize={{ base: "sm", md: "lg" }} display={{ base: "block", md: "none" }} color="orange.700">
                                Faculty :
                            </Box>
                            <Box fontSize={{ base: "md", md: "xl" }}>SIT</Box>
                            <Box fontSize={{ base: "lg", md: "lg" }} display={{ base: "none", md: "block" }} color="orange.700">
                                ,
                            </Box>
                        </Stack>

                        <Stack
                            p={1}
                            direction={{ base: "row", md: "column", lg: "row" }}
                            alignItems={{ base: "center", md: "flex-start", lg: "center" }}
                            spacing={{ base: "2", md: "-1", lg: "2" }}
                        >
                            <Box fontSize={{ base: "sm", md: "lg" }} display={{ base: "block", md: "none" }} color="orange.700">
                                Major :
                            </Box>
                            <Box fontSize={{ base: "md", md: "xl" }}>Computer Science</Box>
                        </Stack>
                    </Stack>
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl" ml={{ base: "", md: "6" }}>
                    <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
                        <HStack position="initial">
                            {isFollow ? (
                                <Button
                                    _hover={{ cursor: "pointer", background: "orange.200" }}
                                    onClick={() => {
                                        handleClick()
                                        setIsFolCount(FolCount + 1)
                                    }}
                                    pl={5}
                                    width={{ md: "7rem", base: "" }}
                                    height={{ md: "3rem", base: "2rem" }}
                                    fontSize={{ base: "", md: "lg" }}
                                    bg="orange.600"
                                    position="initial"
                                    value="inside"
                                    shadow={"lg"}
                                >
                                    Follow
                                </Button>
                            ) : (
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
                                    width={{ md: "7rem", base: "" }}
                                    height={{ md: "3rem", base: "2rem" }}
                                    fontSize={{ base: "", md: "lg" }}
                                    position="initial"
                                    value="inside"
                                >
                                    Following
                                </Button>
                            )}
                        </HStack>
                        <Button
                            pl={5}
                            bg="orange.600"
                            _hover={{ background: "orange.200" }}
                            width={{ md: "7rem", base: "" }}
                            height={{ md: "3rem", base: "2rem" }}
                            fontSize={{ base: "", md: "lg" }}
                            position="initial"
                            value="inside"
                            shadow={"lg"}
                        >
                            Message
                        </Button>{" "}
                        <Menu>
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
                                width={{ md: "2rem", base: "" }}
                                height={{ md: "3rem", base: "2rem" }}
                                fontSize={{ base: "", md: "lg" }}
                                bg="orange.600"
                                value="inside"
                            />
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
                                            <Button colorScheme="orange" mr={3} onClick={onConfirmRPModalOpen}>
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
                    <Stack direction="row" mx={{ base: "50", md: "" }} spacing={{ base: "", md: "" }}>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-1.5", md: "" }}>
                            <Box fontSize={{ base: "lg", md: "2xl" }}>{FolCount}</Box>
                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={{ base: "lg", md: "2xl" }} color="orange.700">
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
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-3.5", md: "" }}>
                            <Box fontSize={{ base: "lg", md: "2xl" }}>0</Box>

                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFriendListopen}>
                                <Box fontSize={{ base: "lg", md: "2xl" }} color="orange.700" mt="0.5rem">
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



        // <ButtonGroup spacing={{ base: "1.5", sm: "3" }}>
        //                 <HStack position="initial">
        //                     {isFollow ? (
        //                         <Button
        //                             _hover={{ cursor: "pointer", background: "orange.200" }}
        //                             onClick={() => {
        //                                 handleClick()
        //                                 setIsFolCount(FolCount + 1)
        //                             }}
        //                             shadow={"lg"}
        //                             colorScheme="orange"
        //                             color="White"
        //                             variant="solid"
        //                         >
        //                             Follow
        //                         </Button>
        //                     ) : (
        //                         <Button
        //                             _hover={{ cursor: "pointer", background: "" }}
        //                             onClick={() => {
        //                                 handleClick()
        //                                 setIsFolCount(FolCount - 1)
        //                             }}
        //                             shadow={"lg"}
        //                             colorScheme="orange"
        //                             variant="outline"
        //                         >
        //                             Following
        //                         </Button>
        //                     )}
        //                 </HStack>
        //                 <Button
        //                     pl={5}
        //                     bg="orange.600"
        //                     _hover={{ background: "orange.200" }}
        //                     color="White"
        //                     position="initial"
        //                     value="inside"
        //                     shadow={"lg"}
        //                 >
        //                     Message
        //                 </Button>{" "}
        //                 <Menu>
        //                     <MenuButton
        //                         as={IconButton}
        //                         bgColor={{ base: "white", md: "orange.600" }}
        //                         icon={<BsThreeDotsVertical />}
        //                         color={{ base: "orange.600", md: "white" }}
        //                         aria-label="Options"
        //                         _hover={{ background: "orange.200" }}
        //                         position="initial"
        //                         variant="solid"
        //                         shadow={"lg"}
        //                     />
        //                     <MenuList>
        //                         <MenuItem color="orange.700" icon={<BsFillFlagFill />} onClick={onReportModalOpen}>
        //                             Report
        //                         </MenuItem>

        //                         <Modal
        //                             initialFocusRef={initialRef}
        //                             finalFocusRef={finalRef}
        //                             isOpen={isReportModalOpen}
        //                             onClose={onReportModalClose}
        //                             motionPreset="slideInBottom"
        //                         >
        //                             <ModalOverlay />
        //                             <ModalContent>
        //                                 <ModalHeader>REPORT</ModalHeader>
        //                                 <ModalCloseButton />
        //                                 <ModalBody pb={6}>
        //                                     <FormLabel>Why are you reporting this account?</FormLabel>
        //                                     <Stack spacing={5} direction="column">
        //                                         <Checkbox colorScheme="orange">Post inappropriate content</Checkbox>
        //                                         <Checkbox colorScheme="orange">Making anxious/guilty</Checkbox>
        //                                         <Checkbox colorScheme="orange">Toxic</Checkbox>
        //                                         <Checkbox colorScheme="orange">Bullying</Checkbox>
        //                                         <Checkbox colorScheme="orange">Harassment</Checkbox>
        //                                     </Stack>

        //                                     <FormControl mt={4}>
        //                                         <FormLabel>Other :</FormLabel>
        //                                         <Input placeholder="Details" />
        //                                     </FormControl>
        //                                 </ModalBody>

        //                                 <ModalFooter>
        //                                     <Button colorScheme="orange" mr={3} onClick={onConfirmRPModalOpen}>
        //                                         Report
        //                                     </Button>
        //                                     <Modal isCentered isOpen={isConfirmRPModalOpen} onClose={onConfirmRPModalClose}>
        //                                         <ModalOverlay />
        //                                         <ModalContent>
        //                                             <ModalHeader>Are you sure to report this account?</ModalHeader>
        //                                             <ModalCloseButton />
        //                                             <ModalBody>
        //                                                 <Text></Text>
        //                                             </ModalBody>

        //                                             <ModalFooter>
        //                                                 <Button
        //                                                     colorScheme="orange"
        //                                                     mr={3}
        //                                                     onClick={() => {
        //                                                         onReportModalClose()
        //                                                         onConfirmRPModalClose()
        //                                                     }}
        //                                                 >
        //                                                     Report
        //                                                 </Button>
        //                                                 <Button
        //                                                     variant="ghost"
        //                                                     onClick={() => {
        //                                                         onReportModalClose()
        //                                                         onConfirmRPModalClose()
        //                                                     }}
        //                                                 >
        //                                                     Close
        //                                                 </Button>
        //                                             </ModalFooter>
        //                                         </ModalContent>
        //                                     </Modal>

        //                                     <Button onClick={onReportModalClose}>Cancel</Button>
        //                                 </ModalFooter>
        //                             </ModalContent>
        //                         </Modal>
        //                         <MenuItem color="orange.700" icon={<BsXOctagonFill />} onClick={onBlockModalOpen}>
        //                             Block
        //                         </MenuItem>
        //                         <Modal isCentered isOpen={isBlockModalOpen} onClose={onBlockModalClose}>
        //                             <ModalOverlay />
        //                             <ModalContent>
        //                                 <ModalHeader>Are you sure to block this account?</ModalHeader>
        //                                 <ModalCloseButton />
        //                                 <ModalBody>
        //                                     <Text></Text>
        //                                 </ModalBody>

        //                                 <ModalFooter>
        //                                     <Button colorScheme="orange" mr={3} onClick={onBlockModalClose}>
        //                                         Block
        //                                     </Button>
        //                                     <Button variant="ghost" onClick={onBlockModalClose}>
        //                                         Close
        //                                     </Button>
        //                                 </ModalFooter>
        //                             </ModalContent>
        //                         </Modal>
        //                         <MenuItem color="orange.700" icon={<BsHandIndexThumbFill />} onClick={onPokeModalOpen}>
        //                             Poke
        //                         </MenuItem>
        //                         <Modal isCentered isOpen={isPokeModalOpen} onClose={onPokeModalClose}>
        //                             <ModalOverlay />
        //                             <ModalContent>
        //                                 <ModalHeader>Are you sure to poke this account?</ModalHeader>
        //                                 <ModalCloseButton />
        //                                 <ModalBody>
        //                                     <Text></Text>
        //                                 </ModalBody>

        //                                 <ModalFooter>
        //                                     <Button colorScheme="orange" mr={3} onClick={onPokeModalClose}>
        //                                         Poke
        //                                     </Button>
        //                                     <Button variant="ghost" onClick={onPokeModalClose}>
        //                                         Close
        //                                     </Button>
        //                                 </ModalFooter>
        //                             </ModalContent>
        //                         </Modal>
        //                     </MenuList>
        //                 </Menu>
        //             </ButtonGroup>







        // <GridItem pl="2" area={"footer"} rounded="xl">
        //             <ButtonGroup color="white" variant="outline" spacing="6">
        //                 <Button pl={5} bg="orange.600" position="initial" value="inside" shadow={"lg"}>
        //                     Follow
        //                 </Button>
        //                 <Button pl={5} bg="orange.600" position="initial" value="inside" shadow={"lg"}>
        //                     Message
        //                 </Button>{" "}
        //                 <Menu>
        //                     <MenuButton
        //                         as={IconButton}
        //                         bgColor={{ base: "white", md: "orange.400" }}
        //                         icon={<BsThreeDotsVertical />}
        //                         color={{ base: "orange.600", md: "white" }}
        //                         aria-label="Options"
        //                         position="initial"
        //                         variant="solid"
        //                         shadow={"lg"}
        //                     />
        //                     <MenuList>
        //                         <MenuItem color="orange.700" icon={<BsFillFlagFill />} onClick={onReportModalOpen}>
        //                             Report
        //                         </MenuItem>

        //                         <Modal
        //                             initialFocusRef={initialRef}
        //                             finalFocusRef={finalRef}
        //                             isOpen={isReportModalOpen}
        //                             onClose={onReportModalClose}
        //                             motionPreset="slideInBottom"
        //                         >
        //                             <ModalOverlay />
        //                             <ModalContent>
        //                                 <ModalHeader>REPORT</ModalHeader>
        //                                 <ModalCloseButton />
        //                                 <ModalBody pb={6}>
        //                                     <FormLabel>Why are you reporting this account?</FormLabel>
        //                                     <Stack spacing={5} direction="column">
        //                                         <Checkbox colorScheme="orange">Post inappropriate content</Checkbox>
        //                                         <Checkbox colorScheme="orange">Making anxious/guilty</Checkbox>
        //                                         <Checkbox colorScheme="orange">Toxic</Checkbox>
        //                                         <Checkbox colorScheme="orange">Bullying</Checkbox>
        //                                         <Checkbox colorScheme="orange">Harassment</Checkbox>
        //                                     </Stack>

        //                                     <FormControl mt={4}>
        //                                         <FormLabel>Other :</FormLabel>
        //                                         <Input placeholder="Details" />
        //                                     </FormControl>
        //                                 </ModalBody>

        //                                 <ModalFooter>
        //                                     <Button colorScheme="orange" mr={3} onClick={onConfirmRPModalOpen}>
        //                                         Report
        //                                     </Button>
        //                                     <Modal isCentered isOpen={isConfirmRPModalOpen} onClose={onConfirmRPModalClose}>
        //                                         <ModalOverlay />
        //                                         <ModalContent>
        //                                             <ModalHeader>Are you sure to report this account?</ModalHeader>
        //                                             <ModalCloseButton />
        //                                             <ModalBody>
        //                                                 <Text></Text>
        //                                             </ModalBody>

        //                                             <ModalFooter>
        //                                                 <Button
        //                                                     colorScheme="orange"
        //                                                     mr={3}
        //                                                     onClick={() => {
        //                                                         onReportModalClose()
        //                                                         onConfirmRPModalClose()
        //                                                     }}
        //                                                 >
        //                                                     Report
        //                                                 </Button>
        //                                                 <Button
        //                                                     variant="ghost"
        //                                                     onClick={() => {
        //                                                         onReportModalClose()
        //                                                         onConfirmRPModalClose()
        //                                                     }}
        //                                                 >
        //                                                     Close
        //                                                 </Button>
        //                                             </ModalFooter>
        //                                         </ModalContent>
        //                                     </Modal>

        //                                     <Button onClick={onReportModalClose}>Cancel</Button>
        //                                 </ModalFooter>
        //                             </ModalContent>
        //                         </Modal>
        //                         <MenuItem color="orange.700" icon={<BsXOctagonFill />} onClick={onBlockModalOpen}>
        //                             Block
        //                         </MenuItem>
        //                         <Modal isCentered isOpen={isBlockModalOpen} onClose={onBlockModalClose}>
        //                             <ModalOverlay />
        //                             <ModalContent>
        //                                 <ModalHeader>Are you sure to block this account?</ModalHeader>
        //                                 <ModalCloseButton />
        //                                 <ModalBody>
        //                                     <Text></Text>
        //                                 </ModalBody>

        //                                 <ModalFooter>
        //                                     <Button colorScheme="orange" mr={3} onClick={onBlockModalClose}>
        //                                         Block
        //                                     </Button>
        //                                     <Button variant="ghost" onClick={onBlockModalClose}>
        //                                         Close
        //                                     </Button>
        //                                 </ModalFooter>
        //                             </ModalContent>
        //                         </Modal>
        //                         <MenuItem color="orange.700" icon={<BsHandIndexThumbFill />} onClick={onPokeModalOpen}>
        //                             Poke
        //                         </MenuItem>
        //                         <Modal isCentered isOpen={isPokeModalOpen} onClose={onPokeModalClose}>
        //                             <ModalOverlay />
        //                             <ModalContent>
        //                                 <ModalHeader>Are you sure to poke this account?</ModalHeader>
        //                                 <ModalCloseButton />
        //                                 <ModalBody>
        //                                     <Text></Text>
        //                                 </ModalBody>

        //                                 <ModalFooter>
        //                                     <Button colorScheme="orange" mr={3} onClick={onPokeModalClose}>
        //                                         Poke
        //                                     </Button>
        //                                     <Button variant="ghost" onClick={onPokeModalClose}>
        //                                         Close
        //                                     </Button>
        //                                 </ModalFooter>
        //                             </ModalContent>
        //                         </Modal>
        //                     </MenuList>
        //                 </Menu>
        //             </ButtonGroup>
        //         </GridItem>

        // <Center py={6}>
        //     <Flex maxW={"95%"} w={"full"} bg={useColorModeValue("red", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
        //         <VStack spacing={4} align="stretch">
        //             <Avatar size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
        //             <Heading mb={4} fontSize={"1xl"} fontWeight={100} fontFamily={"body"}>
        //                 Rateing:9999
        //             </Heading>
        //         </VStack>
        //         <SimpleGrid paddingLeft={25} columns={1} spacingX="10px" spacingY="20px">
        //             <Box textAlign="left" fontSize={"2xl"} height="25px">
        //                 Name: John Doe
        //             </Box>
        //             <Box textAlign="left" fontSize={"2xl"} height="25px">
        //                 ID: 64130500XXX
        //             </Box>
        //             <Box textAlign="left" fontSize={"2xl"} height="25px">
        //                 Facuty: SIT
        //             </Box>
        //         </SimpleGrid>
        //     </Flex>
        // </Center>

        // <Popover placement="bottom" isLazy>
        //                     <PopoverTrigger>
        //                         <IconButton
        //                             color="orange.400"
        //                             aria-label="More server options"
        //                             icon={<BsThreeDotsVertical />}
        //                             variant="outline"
        //                             w="fit-content"
        //                             position="initial"
        //                         />
        //                     </PopoverTrigger>
        //                     <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
        //                         <PopoverArrow />
        //                         <PopoverBody>
        //                             <Stack>
        //                                 <div>
        //                                     <Button
        //                                         w="194px"
        //                                         variant="ghost"
        //                                         justifyContent="space-between"
        //                                         fontWeight="normal"
        //                                         colorScheme="red"
        //                                         fontSize="sm"
        //                                         onClick={onFirstModalOpen}
        //                                     >
        //                                         Report
        //                                     </Button>

        //                                     <Modal
        //                                         initialFocusRef={initialRef}
        //                                         finalFocusRef={finalRef}
        //                                         isOpen={isFirstModalOpen}
        //                                         onClose={onFirstModalClose}
        //                                         motionPreset="slideInBottom"
        //                                     >
        //                                         <ModalOverlay />
        //                                         <ModalContent>
        //                                             <ModalHeader>REPORT</ModalHeader>
        //                                             <ModalCloseButton />
        //                                             <ModalBody pb={6}>
        //                                                 <FormLabel>Why are you reporting this account?</FormLabel>
        //                                                 <Stack spacing={5} direction="column">
        //                                                     <Checkbox colorScheme="orange">Post inappropriate content</Checkbox>
        //                                                     <Checkbox colorScheme="orange">Making anxious/guilty</Checkbox>
        //                                                     <Checkbox colorScheme="orange">Toxic</Checkbox>
        //                                                     <Checkbox colorScheme="orange">Bullying</Checkbox>
        //                                                     <Checkbox colorScheme="orange">Harassment</Checkbox>
        //                                                 </Stack>

        //                                                 <FormControl mt={4}>
        //                                                     <FormLabel>Other :</FormLabel>
        //                                                     <Input placeholder="Details" />
        //                                                 </FormControl>
        //                                             </ModalBody>

        //                                             <ModalFooter>
        //                                                 <Button
        //                                                     onClick={() =>
        //                                                         toast({
        //                                                             title: "Report sent.",
        //                                                             description: "Your report has been sent.",
        //                                                             status: "success",
        //                                                             duration: 9000,
        //                                                             isClosable: true,
        //                                                         })
        //                                                     }
        //                                                     colorScheme="orange"
        //                                                     mr={3}
        //                                                 >
        //                                                     Report
        //                                                 </Button>

        //                                                 <Button onClick={onFirstModalClose}>Cancel</Button>
        //                                             </ModalFooter>
        //                                         </ModalContent>
        //                                     </Modal>
        //                                 </div>
        //                                 <Button
        //                                     onClick={onSecondModalOpen}
        //                                     w="194px"
        //                                     variant="ghost"
        //                                     justifyContent="space-between"
        //                                     fontWeight="normal"
        //                                     colorScheme="red"
        //                                     fontSize="sm"
        //                                 >
        //                                     Block
        //                                 </Button>

        //                                 <AlertDialog
        //                                     motionPreset="slideInBottom"
        //                                     leastDestructiveRef={cancelRef}
        //                                     onClose={onSecondModalClose}
        //                                     isOpen={isSecondModalOpen}
        //                                     isCentered
        //                                 >
        //                                     <AlertDialogOverlay />

        //                                     <AlertDialogContent>
        //                                         <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
        //                                         <AlertDialogCloseButton />
        //                                         <AlertDialogBody>
        //                                             Are you sure you want to discard all of your notes? 44 words will be deleted.
        //                                         </AlertDialogBody>
        //                                         <AlertDialogFooter>
        //                                             <Button ref={cancelRef} onClick={onSecondModalClose}>
        //                                                 No
        //                                             </Button>
        //                                             <Button colorScheme="red" ml={3}>
        //                                                 Yes
        //                                             </Button>
        //                                         </AlertDialogFooter>
        //                                     </AlertDialogContent>
        //                                 </AlertDialog>
        //                                 <Button
        //                                     w="194px"
        //                                     variant="ghost"
        //                                     justifyContent="space-between"
        //                                     fontWeight="normal"
        //                                     colorScheme="red"
        //                                     fontSize="sm"
        //                                 >
        //                                     Poke
        //                                 </Button>
        //                             </Stack>
        //                         </PopoverBody>
        //                     </PopoverContent>
        //                 </Popover>
    )
}
