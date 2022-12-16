import { Button, Box } from "@chakra-ui/react"

import React from "react"
import { CiYoutube } from "react-icons/ci"

const VideoInsert = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Do something with the uploaded image file(s)
        }
    };
    return (
        <Box>
            <Button onClick={() => inputRef.current?.click()} rightIcon={<CiYoutube size="50px" />} colorScheme="orange" variant="outline" marginTop="5" width="330px" height="330px">
                VIDEO
                <input
                    type="file"
                    accept="video/mp4,video/quicktime"
                    ref={inputRef}
                    onChange={handleChange}
                    style={{ display: "none" }}
                />
            </Button>
        </Box>
    )
}

export default VideoInsert
