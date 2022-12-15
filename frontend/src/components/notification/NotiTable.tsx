import {
    Box,
    Button,
    Center,
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
} from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import Modulelist from "./Modulelist"
import NotiList from "./main/NotiList"
import { SettingsIcon } from "@chakra-ui/icons"
import MarkRead from "./MarkRead"
import { Link, useParams } from "react-router-dom"
import NotiSetting from "./NotiSetting"
import API from "src/function/API"
import { alertNoti, Notiobject, pushNotiType } from "@apiType/notification"
import { socketContext } from "src/context/SocketContext"
import { NavBarContext } from "src/context/NavbarContext"
import NotiObject from "./main/NotiObject"
import { templates } from "./templates"
import { showDescription } from "./replaceValue"

const NotiTable = () => {



    const { setcountUnread } = useContext(NavBarContext)

    //reload noti
    const [reLoad, setreLoad] = useState(false)
    const { socketIO } = useContext(socketContext)
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

    const getUserNotiObjectModule = () => API.get("/notification/getusernotiobjectbymodule/" + selectedModule)
    //console.log(getUserNotiObjectModule);

    const [userNotiObjectModule, setUserNotiObjectModule] = useState<Notiobject[]>([])
    useEffect(() => {
        getUserNotiObjectModule().then((res) => {
            setUserNotiObjectModule(res.data)
            setcountUnread(res.data.filter((el: any) => { return el.isRead != true }).length)
            //console.log(res.data.filter((el: any) => { return el.isRead != true }).length);

        })
    }, [reLoad])
    //console.log(userNotiObjectModule);

    const toast = useToast()
    useEffect(() => {
        socketIO.on("push_noti", (data: alertNoti) => {
            toast({
                position: 'bottom-right',
                render: () => (

                    <Box shadow={"lg"} borderRadius="2xl" bg="orange.300" padding={3}>
                        <Stack direction={"row"} spacing={3}>

                            <Stack>
                                <Text fontSize={"sm"} color="white">
                                    {showDescription(data.data, data.notiObject.template)}
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>

                )
            })

            // getUserNotiObjectModule.then((res) => {
            //     setUserNotiObjectModule(res.data)
            // })
            setreLoad(!reLoad)
        })
        return () => {
            socketIO.off("push_noti")
        }
    });


    //setting
    // function ShowSetting() {
    //     const { isOpen, onOpen, onClose } = useDisclosure()

    //     return (
    //         <Center>
    //             <Button size={"1em"} onClick={onOpen}>
    //                 <SettingsIcon color="orange.500" />
    //             </Button>
    //             <Modal isOpen={isOpen} onClose={onClose} isCentered>
    //                 <ModalOverlay />
    //                 <ModalContent>
    //                     <ModalHeader>
    //                         <Text align={"center"}>Notification Setting</Text>
    //                     </ModalHeader>
    //                     <ModalCloseButton />
    //                     <ModalBody>
    //                         <NotiSetting />
    //                     </ModalBody>
    //                     <ModalFooter>
    //                         <Button bg="orange.500" color="white" width={"100%"} onClick={onClose}>
    //                             Confirm
    //                         </Button>
    //                     </ModalFooter>
    //                 </ModalContent>
    //             </Modal>
    //         </Center>
    //     )
    // }
    //console.log(userNotiObjectModule.length);

    return (
        <Box>
            <Flex padding={3} paddingBottom={0}>
                <Box>
                    <Modulelist onClick={showSelectedModule} selectedModule={selectedModule} />
                </Box>
                <Box>
                    <Stack direction={"row"} >
                        <MarkRead module={selectedModule} onClick={load} />
                        {/* {ShowSetting()} */}
                        <NotiSetting />
                    </Stack>
                </Box>
            </Flex>

            <Stack padding={4} paddingTop={2} height={{ base: "72vh", md: "50vh" }} overflow="auto">
                <NotiList module={selectedModule} selectedList={userNotiObjectModule} onClick={load}></NotiList>
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
