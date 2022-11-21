
import { Box, Heading, VStack, Text } from "@chakra-ui/react"
import AppBody from "../components/share/app/AppBody"
import { AiFillAccountBook } from "react-icons/ai"
import img from "../components/share/navbar/pic/logo.png"

import Feed from "src/components/timeline/Feed"

const Home = () => {
    return (

        <AppBody>
            {/* <VStack maxW="100vw" minH="100vh" alignItems={"center"} justifyContent="center">

                <Box margin={10} p={5} bg="white" shadow={"lg"} rounded="xl">

                    <Heading fontSize={{ base: "md", lg: "lg", xl: "2xl" }}>
                        Welcome ! to Student-life{" "}
                        <Box as="span" color="orange.400">
                            KMUTT
                        </Box>
                        !
                    </Heading>
                </Box>

            </VStack> */}
            <Feed></Feed>

        </AppBody>
    )
}

export default Home

