import { Box, Heading, Stack } from "@chakra-ui/react"
import Lottie from "lottie-react"
import loadingAnimation from "../../lotties/loading.json"

const Loading = () => {
    return (
        <Stack justifyContent={"center"} alignItems="center" w="100%" h="100vh">
            <Box marginTop={"-52"}>
                <Lottie animationData={loadingAnimation} loop={true} />

                <Heading textAlign={"center"} color="gray.700" size={"2xl"} marginTop={"-32"}>
                    PLEASE WAIT
                </Heading>
            </Box>

            {/* <Box bg={"white"} height="100%" w={"100%"} pos="absolute" maxHeight={"xl"} />
            <Box bg={"white"} height="100%" w={"100%"} pos="absolute" maxHeight={"4xl"} maxW={"4xl"} rounded="full" /> */}
        </Stack>
    )
}

export default Loading
