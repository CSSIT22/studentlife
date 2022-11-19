import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, IconButton } from "@chakra-ui/react"
import React from "react"

const CancelButton = () => {
    return (
        <Box alignSelf={"center"}>
            <IconButton colorScheme="red" aria-label="Open post option" size="lg" icon={<CloseIcon />} />
        </Box>
    )
}

export default CancelButton
