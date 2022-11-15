import { Avatar, Box, Flex, Heading, Stack } from "@chakra-ui/react"
import React, { FC } from "react"
import DetailBox from "../../components/shopreview/DetailBox"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"

const ShopName: FC<{
    name: String
}> = ({ name }) => {
    return (
        <Box mr={1} p={1} width={"150px"} height={"25px"} px={2} rounded={"2xl"} background={"#57CA44"}>
            <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <img style={{ maxWidth: 16 }} src={"https://www.pngall.com/wp-content/uploads/2018/04/GPS-PNG-Picture.png"}></img>
                <Heading ml={1} size={"xs"} color="white">
                    {name}
                </Heading>
            </Flex>
        </Box>
    )
}

export default ShopName