import { HStack } from "@chakra-ui/react"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import DatingAppBody from "../../../components/dating/DatingAppBody"

const YourAppliedActivityPoll = () => {
    return (
        <DatingAppBody>
            <HStack gap={{ base: "10px", md: "50px" }} display="flex" justifyContent="center" pt="20px">
                <DatingAllActivityButton backgroundColor={"orange.600"} />
                <DatingYourActivityButton backgroundColor={"orange.600"} />
                <DatingAppliedActivityButton backgroundColor={"orange.800"} />
            </HStack>
        </DatingAppBody>
    )
}

export default YourAppliedActivityPoll
