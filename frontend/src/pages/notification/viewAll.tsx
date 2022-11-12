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
import React from "react"
import MarkRead from "../../components/notification/MarkRead"
import Modulelist from "../../components/notification/moduleList/Modulelist"
import NotiListViewAll from "../../components/notification/viewAll/NotiListViewAll"
import NotiObjectViewAll from "../../components/notification/viewAll/NotiObjectViewAll"
import AppBody from "../../components/share/app/AppBody"
import { FiSettings } from "react-icons/fi"
import { Link } from "react-router-dom"
import { OBJECTS } from "../../components/notification/main/objectsTest"
import { MODULES } from "../../components/notification/moduleList/moduleTest"

const viewAll = () => {
    const [selectedModule, setSelectedModule] = React.useState("All")
    //console.log(selectedModule)
    function showSelectedModule(module: string) {
        setSelectedModule(module)
    }
    // const selectedModule: any[] = MODULES.filter((el) => el.isSelect === true)
    const notiListModule: any[] = OBJECTS.filter((el) => el.module == selectedModule)

    function showNotiListViewAll(): any {
        if (selectedModule == "All") {
            // console.log("all")
            // return OBJECTS.map((el) => {
            //     return <NotiList key={Math.random()} selectedList={OBJECTS} date={el.date}></NotiList>
            // })
            return <NotiListViewAll selectedList={OBJECTS}></NotiListViewAll>
        } else {
            // console.log("others")
            // return notiListModule.map((el) => {
            //     return <NotiList key={Math.random()} selectedList={notiListModule} date={el.date}></NotiList>
            // })
            return <NotiListViewAll selectedList={notiListModule}></NotiListViewAll>
        }
    }

    return (
        <AppBody>
            <Flex padding={3}>
            <Box padding={1}><b>Activity :</b></Box>
                <Box>
                    <Modulelist onClick={showSelectedModule} selectedModule={selectedModule} />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <MarkRead />
                    </Stack>
                </Box>
            </Flex>
            <Box borderRadius= "lg" shadow={"2xl"} backgroundColor="white" padding={1} height="75vh">
            <Stack padding={4} height="100%" overflow="auto">
                {showNotiListViewAll()}
            </Stack>
            </Box>
        </AppBody>
    )
}

export default viewAll
