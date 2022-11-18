import { Box, HStack } from "@chakra-ui/react"
import DatingLikedYouButton from "src/components/dating/DatingLikedYouButton"
import DatingYouLikedButton from "src/components/dating/DatingYouLikedButton"
import DatingAppBody from "../../components/dating/DatingAppBody"

const YouLiked = () => {
    return (
        <DatingAppBody>
            <Box display="flex" justifyContent="center">
                <Box bg="#FFF2E6" position="fixed" w="100%" justifyContent="space-between" top={{ base: 21, md: 157 }} id="bottomBar">
                    <Box maxW="100%" pt={{ base: "40px", md: "7px" }}></Box>
                    <HStack
                        gap={{ base: "20px", md: "100px" }}
                        display="flex"
                        justifyContent="center"
                        pt={{ base: "40px", md: "30px" }}
                        pb="30px"
                    >
                        <DatingLikedYouButton backgroundColor="orange.800" />
                        <DatingYouLikedButton backgroundColor="orange.600" />
                    </HStack>
                </Box>
            </Box>
        </DatingAppBody>
    )
}

export default YouLiked
