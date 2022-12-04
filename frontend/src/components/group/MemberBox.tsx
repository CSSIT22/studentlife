import React, { FC } from "react"
import { Box, Text, Flex } from "@chakra-ui/react"

import RequestList from "./RequestList"
import UserList from "./UserList"
import { MdPending } from "react-icons/md"
import Username from "../blog/Username"
const MemberBox: FC<{
    displayBox?: boolean;
    pendingRequest?: [];
    boxType: string;
    data?: any;
    title: string;
    subTitle?: string
}> = ({
    displayBox,
    pendingRequest,
    data,
    title,
    subTitle,
    boxType }) => {

        return (
            <Box
                display={displayBox ? "block" : 'none'}
                boxShadow={"2xl"} width={"100%"}
                backgroundColor="orange.400"
                p={4}
                borderRadius="md"
            >
                <Text as="b" color={"white"}>
                    {title}
                </Text>
                {subTitle ? (
                    <Text as="p" mb="2" color={"white"}>
                        {subTitle}
                    </Text>
                ) : (
                    ""
                )}
                <Box>
                    <Flex mt={3} gap={2} direction="column" justify={"center"} align="center" width={"100%"}>
                        {pendingRequest?.map((i: any) => {
                            return <RequestList
                                userId={i.user.userId}
                                communityId={i.communityId}
                                key={i.user.userId}
                                firstName={i.user.fName}
                                lastName={i.user.lName}
                                joined={i.joined}
                                avatar={i.user.image}
                                majorId={i.user.majorId}
                            />
                        })}
                    </Flex>
                </Box>
            </Box>
        )
    }

export default MemberBox