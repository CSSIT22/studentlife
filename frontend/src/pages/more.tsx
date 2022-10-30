import { Avatar, Box, Heading, HStack, SimpleGrid, useBreakpointValue, VStack } from "@chakra-ui/react"
import React from "react"
import { Link, Navigate } from "react-router-dom"
import AppBody from "../components/share/app/AppBody"
import { moreMenu } from "../components/share/navbar/NavBar"

const More = () => {
    const isDesktop = useBreakpointValue({ base: false, md: true }, { ssr: false })
    if (isDesktop) return <Navigate to="/" />
    return (
        <AppBody>
            <VStack w="100%" alignItems={"flex-start"}>
                <Heading>Profile</Heading>
                <HStack w="100%" p={5} gap={5} justifyContent="space-between" bg="white" shadow={"md"} rounded="3xl">
                    <Avatar />
                    <Heading>@CS22</Heading>
                </HStack>
            </VStack>
            <HStack mt={3} gap={3}>
                <Box flex={3} p={3} py={5} bg="blue.400" color="white" shadow={"md"} rounded="lg">
                    <Heading size="md">Login activity</Heading>
                </Box>
                <Box flex={1} p={3} py={5} bg="red.400" color="white" shadow={"md"} rounded="lg">
                    <Heading size="md">Logout</Heading>
                </Box>
            </HStack>

            <Heading mt={5}>More</Heading>
            <SimpleGrid columns={2} mt={2} gap={3}>
                {moreMenu.map((item) => (
                    <Link to={item.to} key={item.to}>
                        <Box p={3} py={10} bg="white" shadow={"md"} rounded="lg">
                            <Heading size="md">{item.name}</Heading>
                        </Box>
                    </Link>
                ))}
            </SimpleGrid>
        </AppBody>
    )
}

export default More
