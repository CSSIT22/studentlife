import { Box, Image } from "@chakra-ui/react"
import React, { FC } from "react"

const Profile: FC<{
    image: string
}> = ({ image }) => {
    return (
        <Box>
            <Image borderRadius="full" boxSize="80px" objectFit="cover" src={`${image}`} alt="Profile Picture" />
        </Box>
    )
}

export default Profile
