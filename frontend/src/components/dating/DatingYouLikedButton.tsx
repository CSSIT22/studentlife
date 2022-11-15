import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"

const DatingYouLikedButton: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
    return (
        <Link to="/dating/youliked" style={{ textDecoration: "none" }}>
            <Box
                display="flex"
                cursor="pointer"
                w={{ base: "160px", md: "336px" }}
                h={{ base: "57px", md: "74px" }}
                backgroundColor={backgroundColor}
                borderRadius="5px"
                justifyContent="center"
                alignItems="center"
            >
                <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                    People that you liked
                </Text>
            </Box>
        </Link>
    )
}

export default DatingYouLikedButton