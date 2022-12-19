import { Flex, Heading, Box } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import React from 'react'
import annError from './lotties/Error.json'

const AnnounceError = () => {
    return (
        <Box width={"100%"} height="100%">
            <Box pos={"fixed"} bottom={{ base: "40%", md: "38%", lg: "30%" }} left={{ base: "30%", md: "38%", lg: "42%" }}>
                <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Lottie animationData={annError} loop={true} style={{ maxWidth: "15rem" }} />
                </Flex>
            </Box>
        </Box>
    )
}

export default AnnounceError