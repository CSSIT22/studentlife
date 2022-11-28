import React, { useEffect, useState } from "react"
import { Stack, Text, RadioGroup, Radio, Box } from "@chakra-ui/react"
import API from "src/function/API"
import { NotiUser } from "@apiType/notification"
//import { SlClose } from "react-icons/sl";



const NotiSetting = () => {
    const [settingApp, setSettingApp] = React.useState<any>([])
    const [appValue, setAppValue] = React.useState("")
    const [emailValue, setEmailValue] = React.useState("")

    const [notiUser, setNotiUser] = useState<NotiUser>()
    React.useEffect(() => {
        API.get("/notification/getnotiuser").then((res) => {
            setNotiUser(res.data)
        })
    }, [])
    console.log(notiUser?.notiSettingApp as string);
    console.log(notiUser?.notiSettingEmail as string);

    function setUserSetting() {
        React.useEffect(() => {
            API.post("/notification/editusernotisetting/")
        })
    }

    return (
        <Box>
            <Stack paddingLeft={"2rem"}>
                <Text fontWeight="semibold">Application</Text>
                <Box padding={2} paddingLeft={5}>
                    <RadioGroup onChange={setAppValue} value={appValue} colorScheme="orange">
                        <Stack>
                            <Radio spacing={4} value="ALL">
                                All
                            </Radio>
                            <Radio spacing={4} value="MENTION">
                                Mention
                            </Radio>
                            <Radio spacing={4} value="IGNORE">
                                Ignore
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </Box>

                <Text fontWeight="semibold">Email</Text>
                <Box padding={2} paddingLeft={5}>
                    <RadioGroup onChange={setEmailValue} value={emailValue} colorScheme="orange">
                        <Stack>
                            <Radio spacing={4} value="ALL">
                                All
                            </Radio>
                            <Radio spacing={4} value="MENTION">
                                Mention
                            </Radio>
                            <Radio spacing={4} value="IGNORE">
                                Ignore
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </Stack>
        </Box>
    )
}



// function RadioExample() {

//     const [value, setValue] = React.useState("1")
//     return (<><RadioGroup onChange={setValue} value={value} defaultValue="1" colorScheme="orange">
//         <Stack>
//             <Radio spacing={4} value="1">
//                 All
//             </Radio>
//             <Radio spacing={4} value="2">
//                 Mention
//             </Radio>
//             <Radio spacing={4} value="3">
//                 Ignore
//             </Radio>
//         </Stack>
//     </RadioGroup>
//         <RadioGroup onChange={setValue} value={value} defaultValue="1" colorScheme="orange">
//             <Stack>
//                 <Radio spacing={4} value="1">
//                     All
//                 </Radio>
//                 <Radio spacing={4} value="2">
//                     Mention
//                 </Radio>
//                 <Radio spacing={4} value="3">
//                     Ignore
//                 </Radio>
//             </Stack>
//         </RadioGroup></>

//     )
// }

export default NotiSetting
