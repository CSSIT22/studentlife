import React from "react"
import { ReactElement } from "react"
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

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const cancelRef = React.useRef()

    const toast = useToast()
    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    // 3. Extend the theme
    const theme = extendTheme({ breakpoints })

    function EditableControls() {
        const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls()

        return isEditing ? (
            <Button pl={5} bg="orange.400" position="initial" {...getCancelButtonProps()}>
                Following
            </Button>
        ) : (
            <Button pl={5} bg="orange.400" position="initial" {...getSubmitButtonProps()}>
                Follow
            </Button>
        )
    }

    return (
        <Box maxW="100%" mr={0.5} borderRadius="none" overflow="hidden" p="5">
            <Grid
                templateAreas={`
                  "nav main"
                  "nav footer"
                  "nav2 footer2"`}
                gridTemplateRows={"150px 6fr 300px"}
                gridTemplateColumns={"150px 1fr"}
                h={{ base: "12rem", md: "15rem" }}
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="md"
                bg={{ base: "", md: "white" }}
                shadow={{ base: "", md: "lg" }}
            >
                <GridItem rounded="xl" area={"nav"}>
                    <VStack align="stretch" alignItems="center">
                        <Avatar pt={2} display="flex" position="initial" size="2xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
                        <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" rounded="xl" area="main">
                    <Flex p={1} mt={2.5} color="black">
                        Id: 64130500XXX
                    </Flex>

                    <Box p={1} color="black">
                        Name: John Doe
                    </Box>
                    <Box p={1} color="black">
                        Fucuty: SIT
                    </Box>
                    <Box p={1} color="black">
                        Major: Computer Science
                    </Box>
                </GridItem>
                <GridItem pl="2" mt={{ base: 3, md: 1 }} area={{ base: "nav2", md: "footer" }}>
                    <ButtonGroup color="white" variant="outline" spacing="6">
                        <Button pl={5} bg="orange.400" position="initial">
                            Follow
                        </Button>
                        <Button pl={5} bg="orange.400" position="initial">
                            Message
                        </Button>{" "}
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<BsThreeDotsVertical />}
                                color="orange.400"
                                aria-label="Options"
                                position="initial"
                                variant="solid"
                                shadow={"lg"}
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
            </Grid>
        </Box>

        // Help me goddddd it almost finish but my eyes can handle much any more sorry for what i done this is the end of me nowww thank you everyone for support me and help me love you mom dad and my bro sry to be a
        // croward is sorry

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
