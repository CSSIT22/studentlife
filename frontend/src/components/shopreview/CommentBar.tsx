import { Box, Button, Flex, Stack, Textarea, useBreakpointValue } from "@chakra-ui/react"
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
const CommentBar = () => {
    const isMobile = useBreakpointValue({ base: false, md: true }, { ssr: false })
    return (
        <Box
            mb={2}
            background={"white"}
            bottom={"55px"}
            width={"100%"}
            p={1}
            minHeight={18}
            maxHeight={"100px"}
            border={"1px solid rgba(0, 0, 0, 0.1)"}
        >
            <Stack spacing={4} direction="row" alignItems="center">
                <Flex>
                    <Box mb={5} height={"20px"}>
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
