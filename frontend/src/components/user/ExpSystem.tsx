import { useState, useEffect } from "react"
import { VStack, Flex, Heading, Box, Text, Progress, Stack } from "@chakra-ui/react"
import API from "src/function/API"
import { useParams } from "react-router-dom"



function ExpSystem() {
    const param = useParams();
    const [currentExp, setCurrentExp] = useState<number>(0)

    useEffect(() => {
        async function fetch() {
            const res = await API.get(`/user/profile/exp/${param.userID}`)
            setCurrentExp(res.data.exp)
        }
        fetch()
    }, [])




    return (
        <div>
            <Flex rounded="xl" direction="column" mt={4} mx={4} bg="white" position="initial" shadow={"lg"}>
                <Stack direction="row" p="4" fontSize="xl">
                    <Text color="black" fontWeight="500">
                        LV.
                    </Text>
                    <Text color="black" fontWeight="500"  >
                        {Math.floor(currentExp / 100)}
                    </Text>
                </Stack>

                <Progress mx="3" rounded="xl" position="initial" colorScheme="orange" color="gray.400" size="md" value={currentExp / 1000} />
                <Stack direction="row" alignContent="center" ml="5" mb="5" mt={1} spacing={1}>
                    <Text color="black" fontSize="md" fontWeight="500">
                        EXP :
                    </Text>
                    <Text color="black" fontSize="md" fontWeight="500">
                        {currentExp % 1000}
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
