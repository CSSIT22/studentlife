import { HStack, Stack } from "@chakra-ui/react"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingYourActivityBox from "src/components/dating/DatingYourActivityBox"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import DatingAppBody from "../../../../components/dating/DatingAppBody"

const YourActivityPoll = () => {
    return (
        <DatingAppBody>
            <HStack gap={{ base: "10px", md: "50px" }} display="flex" justifyContent="center" pt="20px">
                <DatingAllActivityButton backgroundColor={"orange.600"} />
                <DatingYourActivityButton backgroundColor={"orange.800"} />
                <DatingAppliedActivityButton backgroundColor={"orange.600"} />
            </HStack>
            <Stack pt="30px">
                <DatingYourActivityBox />
            </Stack>
        </DatingAppBody>
    )
}

export default YourActivityPoll