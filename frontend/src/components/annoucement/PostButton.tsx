import { Box, Button, Flex } from "@chakra-ui/react"
import React from "react"

const PostButton = () => {
    return (
        <Box>
            <Flex>
                <Box>
                    <Button colorScheme="orange" size="lg">
                        Post
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default PostButton
