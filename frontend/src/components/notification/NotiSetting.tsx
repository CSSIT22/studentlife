import React, { useEffect, useState } from "react"
import { Stack, Text, RadioGroup, Radio, Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import API from "src/function/API"
import { NotiUser } from "@apiType/notification"
import { SettingsIcon } from "@chakra-ui/icons"
//import { SlClose } from "react-icons/sl";



const NotiSetting = () => {
    const [settingApp, setSettingApp] = React.useState<any>([])


    const { isOpen, onOpen, onClose } = useDisclosure()




    const [notiUser, setNotiUser] = useState<NotiUser>()
    React.useEffect(() => {
        API.get("/notification/getnotiuser").then((res) => {
            setNotiUser(res.data)
        })
    }, [])

    const [appValue, setAppValue] = React.useState(notiUser?.notiSettingApp as string)
    const [emailValue, setEmailValue] = React.useState(notiUser?.notiSettingEmail as string)
    //console.log(notiUser?.notiSettingApp as string);
    //console.log(notiUser?.notiSettingEmail as string);


    //console.log(appValue + emailValue);

    const confirm = () => {
        //console.log(appValue + emailValue);
        //console.log(notiUser?.userId);

        API.post("/notification/editnotiusersetting/" + notiUser?.userId + "/" + appValue + "/" + emailValue)
    }
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
                        <Box>
                            <Stack paddingLeft={"2rem"}>
                                <Text fontWeight="semibold">Application</Text>
                                <Box padding={2} paddingLeft={5}>
                                    <RadioGroup onChange={setAppValue} colorScheme="orange" value={appValue} defaultValue={notiUser?.notiSettingApp as string}>
                                        <Stack>
                                            <Radio spacing={4} value="ALL">
                                                <Stack direction={"row"}>
                                                    <Text>All </Text>
                                                    <Text color="gray.400">: notify me for all updates</Text>
                                                </Stack>
                                            </Radio>

                                            <Radio spacing={4} value="IGNORE">
                                                <Stack direction={"row"}>
                                                    <Text>Ignore</Text>
                                                    <Text color="gray.400">: Don’t be notified</Text>
                                                </Stack>
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>

                                <Text fontWeight="semibold">Email</Text>
                                <Box padding={2} paddingLeft={5}>
                                    <RadioGroup onChange={setEmailValue} colorScheme="orange" value={emailValue} defaultValue={notiUser?.notiSettingEmail as string}>
                                        <Stack>
                                            <Radio spacing={4} value="ALL">
                                                <Stack direction={"row"}>
                                                    <Text>All </Text>
                                                    <Text color="gray.400">: notify me for all updates</Text>
                                                </Stack>
                                            </Radio>

                                            <Radio spacing={4} value="IGNORE">
                                                <Stack direction={"row"}>
                                                    <Text>Ignore</Text>
                                                    <Text color="gray.400">: Don’t be notified</Text>
                                                </Stack>
                                            </Radio>
                                        </Stack>


                                    </RadioGroup>

                                </Box>
                            </Stack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="orange.500" color="white" width={"100%"} onClick={() => { confirm(), onClose() }} >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center >
    )
}

export default NotiSetting
