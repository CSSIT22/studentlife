import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, IconButton } from "@chakra-ui/react"
import React from "react"

const Optionbutton = () => {
    return (
        <Box alignSelf={"center"}>
            <IconButton colorScheme="orange" aria-label="Open post option" size="lg" icon={<HamburgerIcon />} />
        </Box>
    )
}

export default Optionbutton
