import {
    Box,
    Button,
    Center,
    CloseButton,
    filter,
    Flex,
    Show,
    Spacer,
    Stack,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    Avatar,
    AvatarBadge,
    Circle,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Modulelist from "./moduleList/Modulelist"
import NotiList from "./main/NotiList"
import { SettingsIcon } from "@chakra-ui/icons"
import MarkRead from "./MarkRead"
import { Link, useParams } from "react-router-dom"
import NotiSetting from "./NotiSetting"
import API from "src/function/API"
import { Notiobject } from "@apiType/notification"
import { settingApp } from "./main/mockupData/settingApp"

const NotiTable = () => {
    //reload noti
    const [reLoad, setreLoad] = useState(false)
    function load() {
        setreLoad(!reLoad)
    }


    //select module
    const [selectedModule, setSelectedModule] = React.useState("All")
    function showSelectedModule(module: string) {
        setSelectedModule(module)
        setreLoad(!reLoad)
    }

    //getUserNotiObject by Module

    const getUserNotiObjectModule = API.get("/notification/getusernotiobjectbymodule/" + selectedModule)
    //console.log(getUserNotiObjectModule);

    const [userNotiObjectModule, setUserNotiObjectModule] = useState<Notiobject[]>([])
    useEffect(() => {
        getUserNotiObjectModule.then((res) => {
            setUserNotiObjectModule(res.data)
        })
    }, [reLoad])
    //console.log(userNotiObjectModule);




    function showNotiList(): any {
        return <NotiList module={selectedModule} selectedList={userNotiObjectModule} onClick={load}></NotiList>
    }


    function alert() {
        const toast = useToast()
        return (
            <Button
                onClick={() =>
                    toast({
                        position: 'bottom-right',
                        render: () => (

                            // <Box color='white' p={3} bg='blue.500'>
                            //     Hello World
                            // </Box>
                            <Box shadow={"lg"} borderRadius="2xl" bg="orange.300" padding={3}>
                                <Stack direction={"row"} spacing={3}>
                                    <Center><Avatar bg="blackAlpha.200" size={"sm"}>
                                        <AvatarBadge boxSize="1em" bg="green.500" />
                                    </Avatar>
                                    </Center>
                                    <Stack><Text fontSize={"sm"} color="white">
                                        <b>User123456</b> Create a post asdfkj asdf asdad
                                    </Text>
                                        <Text fontSize={"xs"} color="white">
                                            10 hours ago
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Box>

                        )
                    })
                }
            >
                Show Noti
            </Button>
        )
    }

    //setting
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
                    {/* {alert()} */}
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <MarkRead module={selectedModule} onClick={load} />
                        {ShowSetting()}

                    </Stack>
                </Box>
            </Flex>

            <Stack padding={4} paddingTop={2} height={{ base: "72vh", md: "50vh" }} overflow="auto">
                {showNotiList()}
            </Stack>
            <Center paddingTop={2}>
                <Show above="md">
                    <Button size={"sm"} width={"100%"} bg={"orange.500"} color={"white"}>
                        <Link to="/notification/viewAll">
                            <Text>View All</Text>
                        </Link>
                    </Button>
                </Show>
            </Center>
        </Box>
    )
}

export default NotiTable
