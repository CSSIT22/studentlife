import {
    Box,
    Button,
    Center,
    Flex,
    Spacer,
    Stack,
    Text,
    Circle,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@chakra-ui/react"
import React from "react"
import Modulelist from "./Modulelist"
import NotiListViewAll from "./NotiListViewAll"

export const NotiViewAll = () => {
    return (
        <Box
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.500"
            backgroundColor="gray.200"
            width={{ sm: "80%", md: "100%" }}
            height={{ base: "80vh" }}
            padding={4}
        >
            <Flex>
                <Box>
                    <Modulelist />
                </Box>
                <Spacer />
                <Box>
                    <Stack direction={"row"}>
                        <Button bg={"transparent"}> Mark all as read</Button>
                    </Stack>
                </Box>
            </Flex>
            <Stack padding={4}>
                <NotiListViewAll />
            </Stack>
        </Box>
    )
}

export default NotiViewAll
