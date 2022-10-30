import { Box, Heading, VStack, Text } from "@chakra-ui/react"
import AppBody from "../components/share/app/AppBody"

const Home = () => {
    return (
        <AppBody>
            <VStack maxW="100vw" minH="100vh" alignItems={"center"} justifyContent="center">
                <Box p={5} bg="white" shadow={"lg"} rounded="xl">
                    <Heading fontSize={{ base: "md", lg: "lg", xl: "2xl" }}>
                        Welcome ! to Student-life{" "}
                        <Box as="span" color="orange.400">
                            KMUTT
                        </Box>
                        !
                    </Heading>
                </Box>
            </VStack>
        </AppBody>
    )
}

export default Home
