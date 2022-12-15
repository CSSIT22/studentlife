import { Box, Button } from "@chakra-ui/react"
import React from "react"
import { CiImageOn } from "react-icons/ci"

const ImageInsert = () => {
    return (
        <Box>
            <Button rightIcon={<CiImageOn size="50px" />} colorScheme="orange" variant="outline" marginTop="5" width="330px" height="330px">
                IMAGES
            </Button>
        </Box>
    )
}

export default ImageInsert
