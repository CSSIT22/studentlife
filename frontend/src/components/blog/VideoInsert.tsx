import { Button, Box } from "@chakra-ui/react"

import React from "react"
import { CiYoutube } from "react-icons/ci"

const VideoInsert = () => {
    return (
        <Box>
            <Button rightIcon={<CiYoutube />} colorScheme="orange" variant="outline" marginTop="5" width="330px" height="330px">
                Video
            </Button>
        </Box>
    )
}

export default VideoInsert
