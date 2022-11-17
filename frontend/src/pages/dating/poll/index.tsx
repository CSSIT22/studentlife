import { HStack, Stack } from "@chakra-ui/react"
import DatingAllActivityBox from "src/components/dating/DatingAllActivityBox"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import DatingAppBody from "../../../components/dating/DatingAppBody"

const AllActivityPoll = () => {
    return (
        <DatingAppBody>
            <HStack gap={{ base: "10px", md: "50px" }} display="flex" justifyContent="center" pt="20px">
                <DatingAllActivityButton backgroundColor={"orange.800"} />
                <DatingYourActivityButton backgroundColor={"orange.600"} />
                <DatingAppliedActivityButton backgroundColor={"orange.600"} />
            </HStack>
            <Stack pt="30px">
                <DatingAllActivityBox />
            </Stack>
        </DatingAppBody>
    )
}

export default AllActivityPoll
