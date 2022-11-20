import {
    Box,
    Button,
    Center,
    CloseButton,
    filter,
    Flex,
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
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import MarkRead from "../../components/notification/MarkRead"
import Modulelist from "../../components/notification/moduleList/Modulelist"
import NotiListViewAll from "../../components/notification/viewAll/NotiListViewAll"
import NotiObjectViewAll from "../../components/notification/viewAll/NotiObjectViewAll"
import AppBody from "../../components/share/app/AppBody"
import { useParams } from "react-router-dom"
import API from "src/function/API"
import { Notiobject } from "@apiType/notification"
import { MODULES } from "../../components/notification/moduleList/moduleTest"

const viewAll = () => {
    //reload noti
    const [reLoad, setreLoad] = useState(false)
    function load() {
        setreLoad(!reLoad)
    }

    //getNotiobjectViewAll
    const param = useParams()
    const getUserNotiObject = API.get("/notification/getusernotiobject/" + param.id)
    const [userNotiObject, setUserNotiObject] = useState<Notiobject[]>([])
    useEffect(() => {
        getUserNotiObject.then((res) => {
            setUserNotiObject(res.data)
        })
    }, [reLoad])
    //console.log(userNotiObjectViewAll)
    //console.log(OBJECTS)

    //select module
    const [selectedModule, setSelectedModule] = React.useState("All")
    function showSelectedModule(module: string) {
        setSelectedModule(module)
    }
    // const selectedModule: any[] = MODULES.filter((el) => el.isSelect === true)
    const notiListModule: any[] = userNotiObject.filter((el) => el.module == selectedModule)

    function showNotiListViewAll(): any {
        if (selectedModule == "All") {
            return <NotiListViewAll selectedList={userNotiObject} onClick={load}></NotiListViewAll>
        } else {
            return <NotiListViewAll selectedList={notiListModule} onClick={load}></NotiListViewAll>
        }
    }

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
                    {showNotiListViewAll()}
                </Stack>
            </Box>
        </AppBody>
    )
}

export default viewAll
