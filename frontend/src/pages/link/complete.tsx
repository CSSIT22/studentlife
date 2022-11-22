import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Box, Text, Flex, HStack } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
const complete = () => {
    return (
        <AppBody>
            <Container borderWidth="1px" padding="10" borderRadius="xl" background={"white"} gap={2}>
                <Box
                    width={"200px"}
                    height={"40px"}
                    marginLeft={"-30"}
                    marginTop={"-50"}
                    background={"#f2f2f2"}
                    borderRadius={"10px"}
                    fontSize={"md"}
                    border={"3px solid white"}
                    textAlign={"center"}
                >
                    <Center>
                        <Text as={"b"}>SHORTLINK UNBLOCK</Text>
                    </Center>
                </Box>
                <br />
                <Box bgColor={"orange.200"} p="10rem" borderRadius="15">
                    <Box bgColor={"white"} p="5%" w="15rem" h="10rem" borderRadius="15">
                        <Text align="center" fontWeight="bold" fontSize="30px">
                            CREATE SHORTLINK COMPLETE
                        </Text>
                    </Box>
                    <br />
                    <HStack bgColor={"white"} p="10%" w="15rem" h="10rem" borderRadius="15" justify="center">
                        <CheckCircleIcon w="125" h="125" />
                    </HStack>
                </Box>
            </Container>
        </AppBody>
    )
}
export default complete
