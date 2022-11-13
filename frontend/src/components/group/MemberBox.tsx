import React, { FC } from 'react'
import { Box, Text, Flex } from "@chakra-ui/react"

import RequestList from './RequestList';
import UserList from './UserList'
const MemberBox: FC<{ boxType: string; data: any; title: string; subTitle?: string; }> = ({ data, title, subTitle, boxType }) => {
    return (
        <Box boxShadow={'dark-lg'} width={"100%"} backgroundColor="orange.400" p={4} borderRadius="md" >
            <Text as="b" color={'white'}>{title}</Text>{
                subTitle ? (<Text as="p" mb="2" color={'white'}>{subTitle}</Text>) : ""
            }
            <Box>
                {boxType == "request" ? (<Flex mt={3} gap={2} direction="column" justify={"center"} align="center" width={"100%"}>
                    {data.communityMembers.filter((member: any) => member.userRole == "request").map((member: any) => {
                        return (
                            <RequestList key={member.ID} userProfile={member.profile} userName={member.userName} userRole={member.userRole} />
                        )
                    })}
                </Flex>) : (<Flex mt={3} gap={2} direction="column" justify={"center"} align="center" width={"100%"}>
                    {data.communityMembers.filter((member: any) => member.userRole == boxType).map((member: any) => {
                        return (
                            <UserList key={member.ID} userProfile={member.profile} userName={member.userName} userRole={member.userRole} />
                        )
                    })}
                </Flex>)}

            </Box>
        </Box>
    )
}

export default MemberBox