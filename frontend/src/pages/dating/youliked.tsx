import { HStack } from "@chakra-ui/react"
import DatingLikedYouButton from "src/components/dating/DatingLikedYouButton"
import DatingYouLikedButton from "src/components/dating/DatingYouLikedButton"
import DatingAppBody from "../../components/dating/DatingAppBody"

const YouLiked = () => {
    return (
        <DatingAppBody>
            <HStack gap={{ base: "20px", md: "100px" }} display="flex" justifyContent="center" pt={{ base: "20px", md: "30px" }}>
                <DatingLikedYouButton backgroundColor="orange.600" />
                <DatingYouLikedButton backgroundColor="orange.800" />
            </HStack>
        </DatingAppBody>
    )
}

export default YouLiked
