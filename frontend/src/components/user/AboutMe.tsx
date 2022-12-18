import { Box, Flex, Text, SimpleGrid, Stack } from "@chakra-ui/react"

const AboutMe: React.FC<{ aboutMe: any }> = ({ aboutMe }) => {
    return (
        <div>
            <Flex rounded="xl" direction="column" my={4} mx={4} bg="white" position="initial" shadow={"lg"}>
                <Text color="black" p="5" fontSize={{ base: "xl", md: "2xl" }} fontWeight="600">
                    ABOUT ME
                </Text>
                <Box id="detail" ml={5} p={5}>
                    <SimpleGrid columns={{ base: 2, md: 1, lg: 2 }} spacing={7} >
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            PHONE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {aboutMe?.phone}
                        </Text>
                        {/* <Text color="orange.700" fontSize="md" fontWeight="500">
                            AGE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            20
                        </Text> */}
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            SEX
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {aboutMe?.sex}
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            HOBBIES
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {aboutMe?.hobby}
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            BIRTHDATE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {new Date(aboutMe?.birth).toString().substring(0, 15)}
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            YEARS
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {aboutMe?.year}
                        </Text>
                    </SimpleGrid>
                    <Stack direction={{ base: "column", lg: "row" }} mt="5" spacing={{ md: "5", base: "2" }}>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            ADDRESS
                        </Text>
                        <Text mb="5" color="black" fontSize="lg" fontWeight="700">
                            {aboutMe?.address}
                        </Text></Stack>

                </Box>
            </Flex>
        </div>
    )
}

export default AboutMe
