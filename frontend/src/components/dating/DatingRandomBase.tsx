import { Box, Center, Spinner } from "@chakra-ui/react"

const DatingRandomReload = () => {
    return (
        <Center display="flex">
            <Box
                borderRadius="10px"
                w={{ base: "326px", md: "379px" }}
                h={{ base: "397px", md: "459px" }}
                position="absolute"
                top={{ base: "119px", md: "205px" }}
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="orange.400"
            >
                <Spinner size="lg" />
            </Box>
        </Center>
    )
}

export default DatingRandomReload
