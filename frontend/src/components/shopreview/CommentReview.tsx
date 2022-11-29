import { Stack, Avatar, Flex, Spacer, Box, Text } from '@chakra-ui/react';
import React, { FC } from 'react'
import AmountLike from './AmountLike';

const CommentReview: FC<{ image: String; name: String; ment: String; date: String }> = ({ image, name, ment, date }) => {

    function onComment(){
        
    }
    return (
        <Box p={3} minHeight={32} maxHeight={"1000px"} background={"white"} shadow={"md"} rounded={"2xl"}>
            <Stack mb={3} direction={"row"} spacing={"24px"}>
                <Avatar name="" src={`url('${image}')`} />
                <Flex direction={"column"}>
                    <Text as={"b"} color="black" textAlign={"start"} size={"sm"}>
                        {name}
                    </Text>
                    <Text color="gray" size={"sm"}>
                        {date}
                    </Text>
                </Flex>
                {/* <Spacer width={"100%"} as="button"></Spacer> */}
            </Stack>
            <Flex direction={"row"} alignItems={"flex-start"}>
                <Box>
                    <Text overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} as={"b"} color={"black"} mb={3} size={"sm"}>
                        {ment}
                    </Text>
                </Box>
                {/* <Spacer width={"100%"} as="button"></Spacer> */}
            </Flex>
            <Flex mt={3} direction={"row"} justifyContent={"flex-end"}>
                <AmountLike am_like={"100"} />
            </Flex>
        </Box>
    )
}

export default CommentReview