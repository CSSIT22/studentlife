import { Button, Box } from "@chakra-ui/react"

import React from "react"
import { CiYoutube } from "react-icons/ci"

const VideoInsert = () => {
    return (
        <Box>
            <Button rightIcon={<CiYoutube size="50px" />} colorScheme="orange" variant="outline" marginTop="5" width="330px" height="330px">
                VIDEO
            </Button>
        </Box>
    )
}

export default VideoInsert
