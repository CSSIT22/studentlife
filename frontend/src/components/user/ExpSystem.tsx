import React from "react"
import { VStack, Flex, Heading, Box, Text, Progress } from "@chakra-ui/react"

function ExpSystem() {
    return (
        <div>
            <Flex rounded="xl" direction="column" mt={4} ml="5" bg="orange.400">
                <Text color="white" p="5" fontSize="xl" fontWeight="500">
                    LV.10
                </Text>
                <div></div>
                <Progress rounded="xl" mx="3" colorScheme="green" color="gray.400" size="md" value={52} />
                <Text color="white" ml="5" mb="5" mt={1} fontSize="l" fontWeight="500">
                    EXP : 500/999
                </Text>
            </Flex>
        </div>
    )
}

export default ExpSystem
