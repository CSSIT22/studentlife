import { Box, Button, Flex } from "@chakra-ui/react"
import { FC } from "react"

const Clist: FC<any> = () => {
    return (
        <Box minH={"80vh"} background="orange.200kk">
            <Flex
                width={"30%"}
                background="orange.200"
                justify={"space-around"}
                p={5}
                rounded={"lg"}
                fontWeight={"bold"}
                color={"white"}
                alignItems="center"
            >
                <Box  textDecoration={"underline"} fontSize={"xl"}>
                    Chat
                </Box>
                <Box>Group</Box>
            </Flex>
        </Box>
    )
}
export default Clist
