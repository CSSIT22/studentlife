import { Button, Box } from "@chakra-ui/react"

import React, { FC } from "react"
import { CiYoutube } from "react-icons/ci"

const VideoInsert: FC<{ children: React.ReactNode; files: any, setFiles: Function }> = ({ children, files, setFiles }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (event.target.files) {
            setFiles(event.target.files[0]);

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

                    {...files}
                />
                {children}
            </Button>
        </Box>
    )
}

export default VideoInsert
