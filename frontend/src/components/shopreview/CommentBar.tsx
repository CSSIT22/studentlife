import { Box, Button, Flex, Stack, Textarea } from "@chakra-ui/react"
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
const CommentBar = () => {
    const [sticky, setSticky] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 200)
            console.log(window.scrollY)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    })

    return (
        <Box
            background={"#D9D9D9"}
            p={3}
            minWidth={50}
            maxWidth={"1000px"}
            minHeight={18}
            maxHeight={"100px"}
            border={"1px solid rgba(0, 0, 0, 0.1)"}
            rounded={"2xl"}
        >
            <Stack spacing={4} direction="row" alignItems="center">
                <Flex>
                    {" "}
                    <Box mb={5} height={"20px"}>
                        {" "}
                        <Textarea rows={1} cols={150} placeholder="Type your comment" />
                    </Box>
                </Flex>

                <Button alignSelf={"flex-end"} colorScheme="teal" size={"lg"} width={"60"} mt={2} mr={2}>
                    <Box boxSize={""}>Comment</Box>
                </Button>
            </Stack>
        </Box>
    )
}
export default CommentBar
