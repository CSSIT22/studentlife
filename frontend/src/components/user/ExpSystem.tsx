import { useState, useEffect } from "react"
import { VStack, Flex, Heading, Box, Text, Progress, Stack } from "@chakra-ui/react"



function ExpSystem() {
    return (
        <div>
            <Flex rounded="xl" direction="column" mt={4} mx={4} bg="white" position="initial" shadow={"lg"}>
                <Stack direction="row" p="4" fontSize="xl">
                    <Text color="black" fontWeight="500">
                        LV.
                    </Text>
                    <Text color="black" fontWeight="500">
                        10
                    </Text>
                </Stack>

                <div></div>
                <Progress mx="3" rounded="xl" position="initial" colorScheme="orange" color="gray.400" size="md" value={50} />
                <Stack direction="row" alignContent="center" ml="5" mb="5" mt={1} spacing={1}>
                    <Text color="black" fontSize="md" fontWeight="500">
                        EXP :
                    </Text>
                    <Text color="black" fontSize="md" fontWeight="500">
                        500
                    </Text>
                    <Text color="black" fontSize="md" fontWeight="500">
                        /
                    </Text>
                    <Text color="black" fontSize="md" fontWeight="500">
                        1000
                    </Text>
                </Stack>
            </Flex>
        </div>
    )
}

export default ExpSystem
