import { Box, Button, Center, Flex, Stack, Textarea, useBreakpointValue } from "@chakra-ui/react"
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
const CommentBar = () => {
    const isMobile = useBreakpointValue({ base: false, md: true }, { ssr: false })
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
                <Stack direction="row" alignItems="center">
                    <Flex>
                        <Box mb={5} height={"20px"}>
                            <Textarea rows={1} cols={150} placeholder="Type your comment" />
                        </Box>
                    </Flex>

                    <Button colorScheme="teal" size={"lg"} width={"60"} mt={2} mr={2}>
                        Comment
                    </Button>
                </Stack>
            </Box>
        </Center>
    )
}
export default CommentBar
