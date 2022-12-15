import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"

const DatingYourActivityButton: FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
    return (
        <Link to="/dating/poll/yourpoll" style={{ textDecoration: "none" }}>
            <Box
                display="flex"
                cursor="pointer"
                w={{ base: "100px", sm: "130px", md: "200px", lg: "300px", xl: "290px" }}
                h={{ base: "78px", md: "74px", xl: "74px", lg: "74px" }}
                backgroundColor={backgroundColor}
                borderRadius="5px"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
            >
                <Text fontWeight="700" fontSize="20px" lineHeight="120%" color="white" textAlign="center" p="7px">
                    Your activity polls
                </Text>
            </Box>
        </Link>
    )
}

export default DatingYourActivityButton
