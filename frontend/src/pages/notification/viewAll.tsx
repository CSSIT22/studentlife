import {
    Avatar,
    AvatarBadge,
    Box,
    Center,
    Flex,
    Spacer,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import MarkRead from "../../components/notification/MarkRead"
import Modulelist from "../../components/notification/Modulelist"
import NotiListViewAll from "../../components/notification/viewAll/NotiListViewAll"
import NotiObjectViewAll from "../../components/notification/viewAll/NotiObjectViewAll"
import AppBody from "../../components/share/app/AppBody"

import API from "src/function/API"
import { Notiobject, pushNotiType } from "@apiType/notification"
import { NavBarContext } from "src/context/NavbarContext"
import { socketContext } from "src/context/SocketContext"


const viewAll = () => {

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
        })
    }, [reLoad])
    //console.log(userNotiObjectModule);

    const toast = useToast()
    useEffect(() => {
        socketIO.on("push_noti", (data: pushNotiType) => {
            toast({
                position: 'bottom-right',
                render: () => (

                    <Box shadow={"lg"} borderRadius="2xl" bg="orange.300" padding={3}>
                        <Stack direction={"row"} spacing={3}>
                            <Center><Avatar bg="blackAlpha.200" size={"sm"}>
                                <AvatarBadge boxSize="1em" bg="green.500" />
                            </Avatar>
                            </Center>
                            <Stack>
                                {/* <Text fontSize={"sm"} color="white">
                                <b>User123456</b> Create a post asdfkj asdf asdad
                                </Text>
                                <Text fontSize={"xs"} color="white">
                                    10 hours ago
                                </Text> */}
                                <Text fontSize={"sm"} color="white">
                                    You got new notification.
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




    return (
        <AppBody>
            <Flex padding={3}>
                <Box padding={1}>
                    <Text as="b" color={"orange.500"}>
                        Activity :
                    </Text>
                </Box>
                <Box>
                    <Modulelist onClick={showSelectedModule} selectedModule={selectedModule} />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <MarkRead module={selectedModule} onClick={load} />
                    </Stack>
                </Box>
            </Flex>
            <Box borderRadius="lg" shadow={"2xl"} backgroundColor="white" padding={1} height="75vh">
                <Stack padding={4} height="100%" overflow="auto">
                    <NotiListViewAll module={selectedModule} selectedList={userNotiObjectModule} onClick={load}></NotiListViewAll>
                </Stack>
            </Box>
        </AppBody>
    )
}

export default viewAll
