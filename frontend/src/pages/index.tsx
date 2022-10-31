import { Box, Heading, VStack, Text } from "@chakra-ui/react"
import AppBody from "../components/share/app/AppBody"
import { AiFillAccountBook } from "react-icons/ai"

const Home = () => {
    return (
        <AppBody
            secondarynav={[
                {
                    name: "Test",
                    to: "/ad",
                    Icon: AiFillAccountBook,
                    subNav: [{ name: "Sub1", to: "/asd", Icon: AiFillAccountBook }],
                },
            ]}
        >
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
