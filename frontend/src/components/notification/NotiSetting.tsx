import React from "react"
import { Box, Spacer, Stack, Text, RadioGroup, Radio, CloseButton} from "@chakra-ui/react"
//import { SlClose } from "react-icons/sl";
const NotiSetting = () => {
    return (
        <Box
                borderRadius="lg"
                borderWidth="1px"
                borderColor="black"
                backgroundColor="white"
                width={{ base: "70%", md: "30%" }}
                height={{ base: "45vh" }}
                padding={4}
                margin ="auto"
            >
                <Stack>
                    <Stack direction={"row"}>
                        <Spacer /> <CloseButton />
                    </Stack>
                    <Stack direction={"row"} padding={4} paddingBottom={0} paddingTop={0}>
                        <Text
                            bgColor="#060005"
                            bgClip="text"
                            fontSize="xl"
                            fontWeight="bold"
                            padding="auto"
                        >Notifications Setting</Text>
                    </Stack>
                </Stack>
                <Stack padding={4}>
                    <Stack padding={4} paddingTop={0} paddingBottom={6}>
                        <Text fontWeight='semibold'>Application</Text>
                        <RadioExample />
                    </Stack>
                    <Stack padding={4} paddingTop={0} paddingBottom={6}>
                        <Text fontWeight='semibold'>Email</Text>
                        <RadioExample />
                    </Stack>
                </Stack>
        </Box>
    )
}

function RadioExample() {
    const [value, setValue] = React.useState('1')
    return (
      <RadioGroup onChange={setValue} value={value} defaultValue='1' colorScheme='green'>
        <Stack>
          <Radio value='1'>All</Radio>
          <Radio value='2'>Mention</Radio>
          <Radio value='3'>Ignore</Radio>
        </Stack>
      </RadioGroup>
    )
}

export default NotiSetting
