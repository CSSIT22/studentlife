import { Box, Button, Heading, Text } from "@chakra-ui/react"

const DatingWentWrong = () => {
    return (
        <Box display="block">
            <Heading color="black" fontWeight="700" fontSize={{ base: "24px", md: "32px" }} lineHeight="120%" textAlign="center">
                Something went wrong...
            </Heading>
            <Heading color="black" fontWeight="400" fontSize={{ base: "16px", md: "24px" }} lineHeight="120%" textAlign="center">
                Try refreshing the page?
            </Heading>
            <Box pt="30px" display="flex" justifyContent="center">
                <Button colorScheme="orange" onClick={() => window.location.reload()}>
                    <Text color="white">Refresh</Text>
                </Button>
            </Box>
        </Box>
    )
}

export default DatingWentWrong
