import { Stack, Avatar, Flex, Spacer, Box, Text } from '@chakra-ui/react';
import React, { FC } from 'react'
import AmountLike from './AmountLike';

const CommentReview: FC<{ commentId: number; image: String; name: String; ment: String; date: String; am_like: String; reviewId: String; }> = ({ commentId, image, name, ment, date, am_like, reviewId, }) => {

    function onComment() {
        console.log(commentId)
    }
    return (
        <>

            <Box p={3} minHeight={32} maxHeight={"1000px"} background={"white"} shadow={"md"} rounded={"2xl"} >
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
                {/* <Flex mt={3} direction={"row"} justifyContent={"flex-end"}>
                    <AmountLike reviewId={reviewId} am_like={am_like} />
                </Flex> */}
            </Box >
        </>
    )
}

export default CommentReview