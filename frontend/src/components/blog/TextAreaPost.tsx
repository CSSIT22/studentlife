import { Box, ComponentWithAs, Textarea, TextareaProps } from "@chakra-ui/react"
import React from "react"

const TextAreaPost: ComponentWithAs<"textarea", TextareaProps> = (props ) => {
    return (
        <Box>
            <Textarea
                placeholder="Text (Must not longer than 1000 characters)"
                borderColor="orange.300"
                focusBorderColor="red.300"
                width="100%"
                height="100px"
                marginTop="5"
                {...props}
            />
        </Box>
    )
}

export default TextAreaPost
