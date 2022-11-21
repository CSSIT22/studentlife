import { Box, Button, Collapse, Flex, Heading, Link, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"

const ReviewDetail: FC<{ image: String; name: String; ment: String; date: String }> = ({ image, name, ment, date }) => {
    return (
        <Box mb={3} p={3} minHeight={32} maxHeight={"1000px"} background={"white"} shadow={"md"} rounded={"2xl"}>
            <Stack mb={3} direction={"row"} spacing={"24px"}>
                <Avatar name="" src={`url('${image}')`} />
                {/* ดีงข้อมูลมาจาก database */}
                <Flex direction={"column"}>
                    <Text as={"b"} color="black" textAlign={"start"} size={"sm"}>
                        {name}
                    </Text>
                    <Text color="gray" size={"sm"}>
                        {date}
                    </Text>
                </Flex>
                {/* ดีงข้อมูลมาจาก database */}
                <Spacer width={"100%"} as="button"></Spacer>
            </Stack>
            <Flex direction={"row"} alignItems={"flex-start"}>
                <Box>
                    <Text overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} as={"b"} color={"black"} mb={3} size={"sm"}>
                        {ment}
                    </Text>
                </Box>
                <Spacer width={"100%"} as="button"></Spacer>
            </Flex>
            {/* ดีงข้อมูลมาจาก database */}
            <Flex mt={3} direction={"row"} justifyContent={"flex-end"}>
                <AmountLike am_like={"100"} />
                {/* ดีงข้อมูลมาจาก database */}
            </Flex>
        </Box>
    )
}

export default ReviewDetail
