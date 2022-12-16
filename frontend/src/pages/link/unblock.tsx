import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Box, Text } from "@chakra-ui/react"
const unblock = () => {
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
                    <Text as={"b"}>SHORTLINK UNBLOCK</Text>
                </Box>
                <br />
                <Box bgColor={"orange.200"} p="10rem">
                    <Center>
                        <Box bgColor={"white"} p="10%" w="30rem" h="10rem" borderRadius="15">
                            <Text align="center" fontWeight="bold" fontSize="30px">
                                {" "}
                                UNBLOCK{" "}
                            </Text>
                            <br />
                            <Text align="center" fontWeight="bold" fontSize="30px">
                                {" "}
                                SUCCESS{" "}
                            </Text>
                        </Box>
                    </Center>
                </Box>
            </Container>
        </AppBody>
    )
}
export default unblock
