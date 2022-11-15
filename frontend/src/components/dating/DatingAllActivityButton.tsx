import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"

const DatingAllActivityButton: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
    return (
        <Link to="/dating/poll" style={{ textDecoration: "none" }}>
            <Box
                display="flex"
                cursor="pointer"
                w={{ base: "100px", md: "300px" }}
                h={{ base: "78px", md: "74px" }}
                backgroundColor={backgroundColor}
                borderRadius="5px"
                justifyContent="center"
                alignItems="center"
            >
                <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                    All activity polls
                </Text>
            </Box>
        </Link>
    )
}

export default DatingAllActivityButton
