import { Box, Button, Center, CloseButton, filter, Flex, Show, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Modulelist from "./moduleList/Modulelist"
import NotiList from "./main/NotiList"
import { SettingsIcon } from "@chakra-ui/icons"
import MarkRead from "./MarkRead"
import { Link } from "react-router-dom"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import NotiSetting from "./NotiSetting"
import { OBJECTS } from "./main/data/objectsTest"

const NotiTable = () => {
    const [selectedModule, setSelectedModule] = React.useState("All")
    //console.log(selectedModule)
    function showSelectedModule(module: string) {
        setSelectedModule(module)
    }

    const notiListModule: any[] = OBJECTS.filter((el) => el.module == selectedModule)
    //console.log(notiListModule)

    function showNotiList(): any {
        if (selectedModule == "All") {
            return <NotiList selectedList={OBJECTS}></NotiList>
        } else {
            return <NotiList selectedList={notiListModule}></NotiList>
        }
    }
    function ShowSetting() {
        const { isOpen, onOpen, onClose } = useDisclosure()

        return (
            <Center>
                <Button size={"1em"} onClick={onOpen}>
                    <SettingsIcon color="orange.500" />
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Text align={"center"}>Notification Setting</Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <NotiSetting />
                        </ModalBody>
                        <ModalFooter>
                            <Button bg="orange.500" color="white" width={"100%"} onClick={onClose}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Center>
        )
    }
    return (
        <Box>
            <Flex padding={3} paddingBottom={0}>
                <Box>
                    <Modulelist onClick={showSelectedModule} selectedModule={selectedModule} />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <MarkRead />
                        {ShowSetting()}
                    </Stack>
                </Box>
            </Flex>

            <Stack padding={4} paddingTop={2} height="50vh" overflow="auto">
                {showNotiList()}
            </Stack>
            <Center paddingTop={2}>
                <Show above="md">
                    <Button size={"sm"} width={"100%"} bg={"orange.500"} color={"white"}>
                        <Link to="/notification/viewAll/1">
                            <Text>View All</Text>
                        </Link>
                    </Button>
                </Show>
            </Center>
        </Box>
    )
}

export default NotiTable
