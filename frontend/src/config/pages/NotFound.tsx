import { Box, Heading, VStack, Text } from "@chakra-ui/react"
import AppBody from "../../components/share/app/AppBody"

const NotFound = () => {
    return (
        <AppBody>
            <VStack maxW="100vw" minH="100vh" alignItems={"center"} justifyContent="center">
                <Box p={5} bg="white" shadow={"lg"} rounded="xl">
                    <Heading fontSize={{ base: "md", lg: "lg", xl: "2xl" }}>
                        <Box as="span" color="red.400">
                            404
                        </Box>
                        Page Not Found
                    </Heading>
                </Box>
            </VStack>
        </AppBody>
    )
}

export default NotFound
