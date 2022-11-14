import React from "react"
import { Stack, Text, RadioGroup, Radio, Box } from "@chakra-ui/react"
//import { SlClose } from "react-icons/sl";
const NotiSetting = () => {
    return (
        <Box>
            <Stack>
                <Stack direction={"row"} padding={4} paddingBottom={0} paddingTop={0}>
                    <Text bgColor="#060005" bgClip="text" fontSize="xl" fontWeight="bold" padding="auto">
                        Notifications Setting
                    </Text>
                </Stack>
            </Stack>
            <Stack padding={4} paddingLeft={"2em"}>
                <Stack padding={4} paddingTop={0} paddingBottom={6}>
                    <Text fontWeight="semibold">Application</Text>
                    <RadioExample />
                </Stack>
                <Stack padding={4} paddingTop={0} paddingBottom={6}>
                    <Text fontWeight="semibold">Email</Text>
                    <RadioExample />
                </Stack>
            </Stack>
        </Box>
    )
}

function RadioExample() {
    const [value, setValue] = React.useState("1")
    return (
        <RadioGroup onChange={setValue} value={value} defaultValue="1" colorScheme="green">
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

export default NotiSetting
