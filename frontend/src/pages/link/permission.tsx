import { Box, Button, Center, Heading, VStack, Text, Checkbox, ListItem, OrderedList, List, Stack, list, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import SearchUserList from "src/components/shortlink/SearchUserList"
import UList from "src/components/shortlink/UList"

const permission = () => {
    const navigate = useNavigate()
    const complete = () => {
        navigate("/link/complete")
    }
    const shortac = () => {
        navigate("/link/saccess")
    }
    const { isOpen: isListOpen, onOpen: onListOpen, onClose: onListClose } = useDisclosure()
    const btnUse = React.useRef(null)

    return (
        <AppBody>
            <Center>
                <Box width={"80%"} height={"500px"} background={"white"} borderRadius="20px" marginTop={"10%"}>
                    <Box>
                        <Heading
                            width={"300px"}
                            height={"50px"}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"orange.200"}
                            borderRadius={"10px"}
                            fontSize={"xl"}
                            border={"3px solid white"}
                            textAlign={"center"}
                            textColor="white"
                        >
                            SHORTLINK PERMISSION
                        </Heading>
                    </Box>


                    <VStack spacing={4} align="stretch" marginTop={"10%"}>
                        <Box h="70px">
                            <Box width={"100%"}>
                                <Center>
                                    <List>
                                        <ListItem marginBottom={""}>
                                            <Text as={"b"} fontSize="2xl">
                                                User Access
                                            </Text>
                                        </ListItem>

                                        <ListItem marginBottom={"50px"}>
                                            <Button bg={"orange.600"} w={"100%"} height={"60px"} onClick={onListOpen}>
                                                <Text as={"b"}>Click!</Text>
                                            </Button>
                                            <Modal onClose={onListClose} finalFocusRef={btnUse} isOpen={isListOpen}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Select user(s) to access your link!</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody rounded="xl">
                                                        <SearchUserList/>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onClick={complete} bg={"green.400"}>
                                                               Save
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </ListItem>

                                        <ListItem>
                                            <Text as={"b"} fontSize="2xl">
                                                Shortlink Access
                                            </Text>
                                        </ListItem>

                                        <ListItem marginBottom={"50px"}>
                                            <Button bg={"orange.600"} w={"100%"} height={"60px"} onClick={shortac}>
                                                <Text as={"b"}>Click!</Text>
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Center>
                            </Box>
                        </Box>
                        <Box>
                            <br />
                            <br />
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default permission
