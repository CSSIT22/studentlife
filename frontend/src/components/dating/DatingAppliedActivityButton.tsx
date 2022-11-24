import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"

const DatingAppliedActivityButton: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
    return (
        <Link to="/dating/poll/appliedpoll" style={{ textDecoration: "none" }}>
            <Box
                display="flex"
                cursor="pointer"
                w={{ base: "100px", sm: "130px", md: "200px", lg: "300px", xl: "290px" }}
                h={{ base: "78px", md: "74px", xl: "74px", lg: "74px" }}
                backgroundColor={backgroundColor}
                borderRadius="5px"
                justifyContent="center"
                alignItems="center"
            >
                <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                    Applied activity polls
                </Text>
            </Box>
        </Link>
    )
}

export default DatingAppliedActivityButton
