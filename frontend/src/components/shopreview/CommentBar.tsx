import { Box, Button, Center, color, Flex, Input, Stack, Textarea, useBreakpointValue } from "@chakra-ui/react"
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import API from "src/function/API"
import { useParams } from 'react-router-dom'
const CommentBar: React.FC<{}> = () => {

    const [Text, setText] = useState<any>("")

    let param = useParams()
    const onComment = () => {
        console.log(Text);

        API.post<any>("/shopreview/postcomment", {
            reviewId: param.reviewId,
            text: Text,
        }).then((res) => {
            console.log(res)
            window.location.reload()
        })

    }
    function handleSubmit(c: any) {
        c.preventDefault()
    }
    return (
        <Center>
            <Box
                width={{ base: "102%", md: "80%", lg: "65%" }}
                position={"fixed"}
                mb={2}
                background={"white"}
                bottom={{ base: "45px", lg: "-10px" }}
                // left={{ base: "-5px", lg: "265px" }}
                p={2}
                border={"1px solid rgba(0, 0, 0, 0.1)"}
            >
                <Stack direction="row" alignItems="center" onSubmit={handleSubmit}>
                    <Box mb={5} height={"20px"} width={{ base: "500%" }}>
                        <Center>
                            <Input
                                width={"100%"}
                                placeholder="Type your comment"
                                // autoFocus={autoFocus}
                                value={Text}
                                type={"text"}
                                onChange={e => setText(e.target.value)}
                            /></Center>
                    </Box>
                    <Button colorScheme="orange" size={"lg"} width={{ base: "50%", lg: "80%" }} mt={2} mr={2}
                        cursor={"pointer"} onClick={onComment}>
                        Comment
                    </Button>
                </Stack>
            </Box>
        </Center>
    )
}
export default CommentBar

