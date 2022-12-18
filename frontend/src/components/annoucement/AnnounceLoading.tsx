import { Flex, Heading ,Box} from '@chakra-ui/react'
import Lottie from 'lottie-react'
import React from 'react'
import Loading from './lotties/Loading.json'

const AnnounceLoading = () => {
    return (
        <Box width={"100%"} height="100%">
            <Box pos={"fixed"} bottom={{ base: "40%", md: "38%", lg: "30%" }} left={{ base: "30%", md: "38%", lg: "42%" }}>
                <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Lottie animationData={Loading} loop={true} style={{ maxWidth: "10rem" }} />
                    <Heading textAlign={"center"} >LOADING...</Heading>
                </Flex>
            </Box>
        </Box>
    )
}

export default AnnounceLoading