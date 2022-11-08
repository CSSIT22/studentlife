import AppBody from "../../components/share/app/AppBody"
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react"
import { BsMicrosoft } from "react-icons/bs"
import logo from "../../components/share/navbar/pic/logo.png"

const index = () => {
    return (
        <AppBody disableNav>
            <VStack spacing={10} p={10}>
                <Flex align="center" justify="center">
                    <img src={logo} alt="logo" />
                </Flex>
                <Heading textAlign={"center"} fontWeight={500} color="mainBtn.700" textTransform={"uppercase"}>
                    Login or Register
                </Heading>
                <Button
                    colorScheme="orange"
                    color="white"
                    size="lg"
                    rounded="full"
                    as="a"
                    href={`${import.meta.env.VITE_AUTH_URL}`}
                    style={{ cursor: "pointer" }}
                >
                    <Box mr={5}>
                        <BsMicrosoft />
                    </Box>
                    Login with Microsoft
                </Button>
            </VStack>
        </AppBody>
    )
}

export default index
