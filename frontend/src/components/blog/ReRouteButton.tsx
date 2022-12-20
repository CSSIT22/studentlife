import { Button, Box, ButtonProps, ComponentWithAs } from "@chakra-ui/react"
import React from "react"

const ReRouteButton: ComponentWithAs<"button", ButtonProps> = ( props) => {
    return (
        <Box>
            <Button colorScheme="orange" size="lg" w={250} {...props}>
            </Button>
        </Box>
    )
}

export default ReRouteButton
