import {
    Box,
    Button,
    Center,
    Flex,
    Show,
    Spacer,
    Stack,
    Text,
    useBoolean,
    useToast,
} from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import Modulelist from "./Modulelist"
import NotiList from "./main/NotiList"
import MarkRead from "./MarkRead"
import { Link, useParams } from "react-router-dom"
import NotiSetting from "./NotiSetting"
import API from "src/function/API"
import { alertNoti, Notiobject, NotiObjectMudule, NotiUser, pushNotiType } from "@apiType/notification"
import { socketContext } from "src/context/SocketContext"
import { NavBarContext } from "src/context/NavbarContext"
import { showDescription } from "./functions/replaceValue"
import { showUser } from "./functions/showUser"

const NotiTable = () => {
    const [notiUser, setNotiUser] = useState<NotiUser>()
    React.useEffect(() => {
        API.get("/notification/getnotiuser").then((res) => {
            setNotiUser(res.data)
        })
    }, [])

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


    const [userNotiObjectModule, setUserNotiObjectModule] = useState<NotiObjectMudule[]>([])
    useEffect(() => {
        getUserNotiObjectModule().then((res) => {
            setUserNotiObjectModule(res.data)
            setcountUnread(res.data.filter((el: any) => { return el.isRead != true }).length)
            //console.log(res.data.filter((el: any) => { return el.isRead != true }).length);

        }).finally(off)
    }, [reLoad])

    const toast = useToast()
    useEffect(() => {
        socketIO.on("push_noti", (data: alertNoti) => {
            if (notiUser?.notiSettingApp == "ALL") {
                toast({
                    position: 'bottom-right',
                    render: () => (
                        <Box shadow={"lg"} borderRadius="2xl" bg="orange.300" padding={3}>
                            <Stack direction={"row"} spacing={3}>

                                {showUser(data.notiObject.userId, notiUser.userId, data.notiObject.module)}
                                <Text fontSize={"sm"} color="white">
                                    {showDescription(data.data, data.notiObject.template)}
                                </Text>

                            </Stack>
                        </Box>

                    )
                })
            }



            // getUserNotiObjectModule.then((res) => {
            //     setUserNotiObjectModule(res.data)
            // })
            setreLoad(!reLoad)
        })
        return () => {
            socketIO.off("push_noti")
        }
    });

    if (isLoading) return (

        <Center h={"80vh"}>
            <iframe src="https://embed.lottiefiles.com/animation/63861"></iframe>
        </Center>

    )
    return (
        <Box>
            <Flex padding={3} paddingBottom={0}>
                <Box>
                    <Modulelist onClick={showSelectedModule} selectedModule={selectedModule} />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"} >
                        <MarkRead module={selectedModule} onClick={load} />
                        {/* {ShowSetting()} */}
                        <NotiSetting notiUser={notiUser as NotiUser} />
                    </Stack>
                </Box>
            </Flex>

            <Stack padding={4} paddingTop={2} height={{ base: "72vh", md: "50vh" }} overflow="auto">
                <NotiList module={selectedModule} selectedList={userNotiObjectModule} onClick={load}></NotiList>
            </Stack>
            <Center paddingTop={2}>
                <Show above="md">
                    <Link style={{ width: "100%" }} to="/notification/viewAll">
                        <Button size={"sm"} width={"100%"} bg={"orange.500"} color={"white"}>
                            <Text>View All</Text>
                        </Button>
                    </Link>
                </Show>
            </Center>
        </Box>
    )
}

export default NotiTable
