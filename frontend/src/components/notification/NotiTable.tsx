import { Box, Button, Center, CloseButton, Flex, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react"
import React from "react"
import Modulelist from "./Modulelist"
import NotiList from "./NotiList"
import { FiSettings } from "react-icons/fi"
import MarkRead from "./MarkRead"
import { Link } from "react-router-dom"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import NotiSetting from "./NotiSetting"

const NotiTable = () => {
    return (
        <Box>
            <Flex padding={3}>
                <Box>
                    Module :
                    <Modulelist />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <MarkRead />
                            <Button size={"1em"} bg={"transparent"}>
                                <ShowSetting />
                            </Button>
                    </Stack>
                </Box>
            </Flex>
            <Stack padding={4} height="50vh" overflow="auto">
                <NotiList />
                <NotiList />
                <NotiList />
            </Stack>
            <Center paddingTop={2}>
                <Button size={"sm"}>
                    <Link to="/notification/viewAll">View All</Link>
                </Button>
            </Center>
        </Box>
    )
}

function ShowSetting() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button size={"1em"} onClick={onOpen}><FiSettings size={"1.2em"}/></Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
                
                <ModalOverlay>
                
                    <Box 
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="black"
                        backgroundColor="white"
                        width={{ base: "60%", md: "30%" }}
                        height={{ base: "45vh"}}
                        padding={4}
                        margin ="auto"
                        minH ='md'
                    >
                        <Stack align="end">
                            <CloseButton onClick={onClose}/>
                        </Stack>
                        <Stack>
                            <NotiSetting/>
                        </Stack>
                    </Box>
                    
                </ModalOverlay>
                    
            </Modal>
      </>
    )
  }

export default NotiTable
