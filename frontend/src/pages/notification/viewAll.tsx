import {
    Avatar,
    AvatarBadge,
    Box,
    Center,
    Flex,
    Spacer,
    Stack,
    Text,
    useBoolean,
    useToast,
} from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import MarkRead from "../../components/notification/MarkRead"
import Modulelist from "../../components/notification/Modulelist"
import NotiListViewAll from "../../components/notification/viewAll/NotiListViewAll"
import AppBody from "../../components/share/app/AppBody"


import API from "src/function/API"
import { alertNoti, Notiobject, NotiObjectMudule, pushNotiType } from "@apiType/notification"
import { NavBarContext } from "src/context/NavbarContext"
import { socketContext } from "src/context/SocketContext"


const viewAll = () => {
    const [isLoading, { off }] = useBoolean(true)
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

    const [userNotiObjectModule, setUserNotiObjectModule] = useState<NotiObjectMudule[]>([])
    useEffect(() => {
        getUserNotiObjectModule().then((res) => {
            setUserNotiObjectModule(res.data)
            setcountUnread(res.data.filter((el: any) => { return el.isRead != true }).length)
        }).finally(off)
    }, [reLoad])
    //console.log(userNotiObjectModule);

    useEffect(() => {
        socketIO.on("push_noti", (data: pushNotiType) => {
            setreLoad(!reLoad)
        })
        return () => {
            socketIO.off("push_noti")
        }
    });
    if (isLoading) return (
        <AppBody>
            <Center h={"80vh"}>
                <iframe src="https://embed.lottiefiles.com/animation/63861"></iframe>
            </Center>
        </AppBody>
    )
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
