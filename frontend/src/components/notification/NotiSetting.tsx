import React from "react"
import { Stack, Text, RadioGroup, Radio, Box } from "@chakra-ui/react"
//import { SlClose } from "react-icons/sl";
const NotiSetting = () => {
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

function RadioExample() {
    const [value, setValue] = React.useState("1")
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

export default NotiSetting
