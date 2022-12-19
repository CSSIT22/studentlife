import { Flex, Text, Progress, Stack } from "@chakra-ui/react"

const ExpSystem: React.FC<{ exp: number, level: number }> = ({ exp, level }) => {

    return (
        <div>
            <Flex rounded="xl" direction="column" mt={4} mx={4} bg="white" position="initial" shadow={"lg"}>
                <Stack direction="row" p="4" fontSize="xl">
                    <Text color="black" fontWeight="500">
                        LV.
                    </Text>
                    <Text color="black" fontWeight="500"  >
                        {level}
                    </Text>
                </Stack>

                <Progress mx="3" rounded="xl" position="initial" colorScheme="orange" color="gray.400" size="md" value={(exp / 1000) * 100} />
                <Stack direction="row" alignContent="center" ml="5" mb="5" mt={1} spacing={1}>
                    <Text color="black" fontSize="md" fontWeight="500">
                        EXP :
                    </Text>
                    <Text color="black" fontSize="md" fontWeight="500">
                        {exp}
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
