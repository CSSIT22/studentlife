import { Box, Flex, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

const AmountLike: FC<{ am_like: String }> = ({ am_like }) => {
    return (
        <Box as="button" p={1} mr={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#CA44BD"}>
            <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <img
                    style={{ maxWidth: 18 }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png"
                ></img>
                <Heading ml={1} size={"xs"} color={"white"}>
                    {am_like}
                    {/* ดีงข้อมูลมาจาก database */}
                </Heading>
            </Flex>
        </Box>
    )
}

export default AmountLike
