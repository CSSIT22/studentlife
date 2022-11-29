import { Box, Button, ButtonProps, ComponentWithAs, Flex } from "@chakra-ui/react"
import React from "react"

const PostButton: ComponentWithAs<"button", ButtonProps> = (props) => {
    return (
        <Box>
            <Flex>
                <Box>
                    <Button colorScheme="orange" size="lg" {...props}>
                        Post
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default PostButton
