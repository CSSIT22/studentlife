import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"

const ReviewDetail: FC<{ image: String; name: String; ment: String; date: String }> = ({ image, name, ment, date }) => {
    return (
        <Box
            p={3}
            minHeight={32}
            maxHeight={"200px"}
            background={"white"}
            border={"1px solid rgba(0, 0, 0, 0.1)"}
            rounded={"2xl"}
            ml={"60px"}
            mr={"60px"}
        >
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
            </Stack>
            <Flex direction={"row"} alignItems={"flex-start"}>
                <Text as={"b"} color={"black"} mb={3} size={"sm"}>
                    {ment}
                </Text>
            </Flex>
            {/* ดีงข้อมูลมาจาก database */}
            <Flex direction={"row"} justifyContent={"flex-end"}>
                <Box>
                    <img
                        style={{ width: 20 }}
                        src="https://toppng.com/public/uploads/thumbnail/white-location-icon-png-location-logo-png-white-11562856661b4wsud8br0.png"
                    ></img>
                    {}
                </Box>
            </Flex>
        </Box>
    )
}

export default ReviewDetail
