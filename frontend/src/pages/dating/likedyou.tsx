import { HStack } from "@chakra-ui/react"
import DatingLikedYouButton from "src/components/dating/DatingLikedYouButton"
import DatingYouLikedButton from "src/components/dating/DatingYouLikedButton"
import DatingAppBody from "../../components/dating/DatingAppBody"

const LikedYou = () => {
    return (
        <DatingAppBody>
            <HStack gap={{ base: "20px", md: "100px" }} display="flex" justifyContent="center">
                <DatingLikedYouButton backgroundColor="orange.800"/>
                <DatingYouLikedButton backgroundColor="orange.600"/>
            </HStack>
        </DatingAppBody>
    )
}

export default LikedYou
