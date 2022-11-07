import { Box, Flex } from "@chakra-ui/react"

const Clist = () => {
    return (
        <Box minH={"80vh"} background="orange.200kk">
            <Flex
                width={"30%"}
                background="orange.200"
                justify={"space-around"}
                p={5}
                rounded={"lg"}
                fontSize={"lg"}
                fontWeight={"bold"}
                color={"white"}
            >
                <Box>Chat</Box>
                <Box>Group</Box>
            </Flex>
        </Box>
    )
}
export default Clist;
