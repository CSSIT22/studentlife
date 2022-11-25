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

    //getNotiobject

    const getUserNotiObject = API.get("/notification/getusernotiobject")
    const [userNotiObject, setUserNotiObject] = useState<Notiobject[]>([])
    useEffect(() => {
        getUserNotiObject.then((res) => {
            setUserNotiObject(res.data)
        })
    }, [reLoad])
    //console.log(userNotiObject)
    //console.log(OBJECTS)

    //select module
    const [selectedModule, setSelectedModule] = React.useState("All")
    function showSelectedModule(module: string) {
        setSelectedModule(module)
    }

    //create list of selected module
    const notiListModule: any[] = userNotiObject.filter((el) => el.module == selectedModule)

    function showNotiList(): any {
        if (selectedModule == "All") {
            return <NotiList selectedList={userNotiObject} onClick={load}></NotiList>
        } else {
            return <NotiList selectedList={notiListModule} onClick={load}></NotiList>
        }
    }
    function alert() {
        const toast = useToast()
        return (
          <Button
            onClick={() =>
              toast({
                title: 'New Notification.',
                description: "iuytfrftgyhuojipkl[;",
                duration: 3000,
                isClosable: true,
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
                    {alert()}
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
