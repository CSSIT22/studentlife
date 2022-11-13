import React, { FC } from "react"
import { VStack, Text, Grid, Container, Center, NumberInput, NumberInputField, Stack, Avatar } from "@chakra-ui/react"

const UserAndPoint: FC<{
    userId: string
    userEmail: string
    point: number
}> = ({ userId, userEmail, point }) => {
    return (
        <div>
            <Container maxW="80%" bg="orange.400" my="24px" borderRadius="10px" shadow={"lg"}>
                <Grid templateColumns="repeat(2, 1fr)">
                    {/* user info */}
                    <Container w="100%" bg="orange.50" color="black" my="23px" borderRadius="10px">
                        <Stack direction="row" my="23px" align="center">
                            <Avatar src="https://bit.ly/broken-link" size="xl" />
                            <Container>
                                <VStack spacing={1} align="stretch" my="13px">
                                    <Text fontSize="xl" fontWeight={"bold"}>
                                        USER ID: {userId}
                                    </Text>
                                    <Text fontSize="xl" fontWeight={"bold"}>
                                        EMAIL: {userEmail}
                                    </Text>
                                </VStack>
                            </Container>
                        </Stack>
                    </Container>

                    {/* point */}
                    <Container bg="orange.50" color="black" my="23px" w="100%" borderRadius="10px" shadow={"lg"}>
                        <Stack direction="row" my="23px" align="center">
                            <Container>
                                <VStack spacing={1} align="stretch" my="13px">
                                    <Text fontSize="xl" fontWeight={"bold"} align="center">
                                        Total Balance Point
                                    </Text>
                                    <Text fontSize="xl" align="center" fontWeight={"bold"}>
                                        {point}
                                    </Text>
                                </VStack>
                            </Container>
                            <Container bg="orange.500" color="white" borderRadius="5px" w={"100%"} shadow={"lg"}>
                                <Stack direction="row">
                                    <Center flex="1">
                                        <Text fontSize="lg" fontWeight={"bold"}>
                                            Use Point
                                        </Text>
                                    </Center>
                                    <Center>
                                        <NumberInput defaultValue={0} w="100px" bg="orange.500" my={"5px"}>
                                            <NumberInputField />
                                        </NumberInput>
                                    </Center>
                                </Stack>
                            </Container>
                        </Stack>
                    </Container>
                </Grid>
            </Container>
        </div>
    )
}

export default UserAndPoint
