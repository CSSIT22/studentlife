import { Avatar, Box } from "@chakra-ui/react"
import React, { FC } from "react"

const ShowUser: FC<{ userId: string; userEmail: string }> = (props) => {
    return (
        <Box gap="4" display="flex" borderRadius="2xl" alignItems="center" bg="lightgrey" w="100%" p={3}>
            <Avatar size="xl" src="https://bit.ly/sage-adebayo" />
            <div>
                <h2>{props.userId}</h2>
                <h2>{props.userEmail}</h2>
            </div>
        </Box>
    )
}

export default ShowUser
