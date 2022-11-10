import { Box, Button, Center, CloseButton, filter, Flex, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react"
import React from "react"
import Modulelist from "./moduleList/Modulelist"
import NotiList from "./main/NotiList"
import { FiSettings } from "react-icons/fi"
import MarkRead from "./MarkRead"
import { Link } from "react-router-dom"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import NotiSetting from "./NotiSetting"
import { OBJECTS } from "./main/objectsTest"
import { MODULES } from "./moduleList/moduleTest"

const NotiTable = () => {
    const [selectedModule, setSelectedModule] = React.useState("All")
    //console.log(selectedModule)
    function showSelectedModule(module: string) {
        setSelectedModule(module)
    }
    // const selectedModule: any[] = MODULES.filter((el) => el.isSelect === true)
    const notiListModule: any[] = OBJECTS.filter((el) => el.module == selectedModule)
    //console.log(notiListModule)

    // const key = "date"
    // const notiListDate: any[] = [...new Map(notiListModule.map((el: any) => [el[key], el])).values()]
    // console.log(notiListDate)

    // const arrayUniqueByKey: any = [
    //     ...new Set(notiListModule.map((item) => item.date.getDate() + "/" + item.date.getMonth() + "/" + item.date.getFullYear())),
    // ]

    // console.log(arrayUniqueByKey)

    // const [dateList, setDateList] = React.useState()
    // {
    //     setDateList(arrayUniqueByKey)
    // }
    function showNotiList(): any {
        if (selectedModule == "All") {
            console.log("all")
            return OBJECTS.map((el) => {
                return <NotiList key={Math.random()} selectedList={OBJECTS} date={el.date}></NotiList>
            })
        } else {
            console.log("others")
            return notiListModule.map((el) => {
                return <NotiList key={Math.random()} selectedList={notiListModule} date={el.date}></NotiList>
            })
        }
    }
    return (
        <Box>
            <Flex padding={3}>
                <Box>
                    <Modulelist onClick={showSelectedModule} selectedModule={selectedModule} />
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
                {showNotiList()}
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
        <Center>
            <Button size={"1em"} onClick={onOpen}>
                <FiSettings size={"1.2em"} />
            </Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay paddingTop={{ base: "35%", sm: "30%", md: "25%", lg: "15%" }}>
                    <Box
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="black"
                        backgroundColor="white"
                        width={{ base: "60%", md: "30%" }}
                        height={{ base: "45vh" }}
                        padding={4}
                        margin="auto"
                        minH="md"
                    >
                        <Stack align="end">
                            <CloseButton onClick={onClose} />
                        </Stack>
                        <Stack>
                            <NotiSetting />
                        </Stack>
                    </Box>
                </ModalOverlay>
            </Modal>
        </Center>
    )
}

export default NotiTable
