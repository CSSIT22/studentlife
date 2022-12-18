import { Box, ComponentWithAs, Textarea, TextareaProps } from "@chakra-ui/react"
import ResizeTextarea from "react-textarea-autosize";
import React from "react"

const TextAreaPost: ComponentWithAs<"textarea", TextareaProps> = ((props: any) => {
    return (
        <Box>
            <Textarea
                placeholder="Text (Must not longer than 1000 characters)"
                borderColor="orange.300"
                focusBorderColor="red.300"
                width="100%"
                minH="unset"
                overflow="hidden"
                resize="none"
                minRows={1}
                as={ResizeTextarea}
                marginTop="5"
                fontSize={"18px"}
                {...props}
            />
        </Box>
    )
});

export default TextAreaPost
