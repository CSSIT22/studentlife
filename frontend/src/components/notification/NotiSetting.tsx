import React, { FC, useEffect, useState } from "react"
import { Stack, Text, RadioGroup, Radio, Box } from "@chakra-ui/react"
import { USER } from "./main/mockupData/userProfile"
import API from "src/function/API"
import { useParams } from "react-router-dom"
import { settingApp } from "./main/mockupData/settingApp"
//import { SlClose } from "react-icons/sl";
const NotiSetting: FC<{
    id: string,
    appSettingType: number
}> = ({ id, appSettingType }) => {
    function RadioExample() {
        const [value, setValue] = React.useState("")
        //let user = settingApp.filter((el) => el.id == settingApp[0].id)

        
        if (appSettingType = 1){}
        else if (appSettingType = 2){ setValue("2") }
        else if (appSettingType = 3){ setValue("3") }
        
        return (
            <RadioGroup onChange={setValue} value={value} defaultValue="1" colorScheme="orange">
                <Stack>
                    <Radio spacing={4} value="1">
                        All
                    </Radio>
                    <Radio spacing={4} value="2">
                        Mention
                    </Radio>
                    <Radio spacing={4} value="3">
                        Ignore
                    </Radio>
                </Stack>
            </RadioGroup>
        )
    }
    
    return (
        <Box>
            <Stack paddingLeft={"2rem"}>
                <Text fontWeight="semibold">Application</Text>
                <Box padding={2} paddingLeft={5}>
                    <RadioExample />
                </Box>

                <Text fontWeight="semibold">Email</Text>
                <Box padding={2} paddingLeft={5}>
                    <RadioExample />
                </Box>
            </Stack>
        </Box>
    )
}

export default NotiSetting
