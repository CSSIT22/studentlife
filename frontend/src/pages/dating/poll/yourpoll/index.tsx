import { HStack, Stack, Box, Center, Flex } from "@chakra-ui/react"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingCreatePollButton from "src/components/dating/DatingCreatePollButton"
import DatingYourActivityBox from "src/components/dating/DatingYourActivityBox"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import DatingAppBody from "../../../../components/dating/DatingAppBody"

const YourActivityPoll = () => {
    return (
        <DatingAppBody>
            <Center>
                <Box
                    mt={{ base: "-20px", md: "7px" }}
                    pr="500px"
                    pl="500px"
                    pt={{ base: "-20px", md: "20px" }}
                    zIndex="2"
                    position="fixed"
                    top={{ base: 20, md: 150 }}
                    justifyContent="center"
                    bg="#FFF2E5"
                >
                    <HStack gap={{ base: "10px", md: "40px", lg: "40px" }} display="flex" justifyContent="center" pt="20px">
                        <DatingAllActivityButton backgroundColor={"orange.800"} />
                        <DatingYourActivityButton backgroundColor={"orange.600"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.800"} />
                    </HStack>
                </Box>
            </Center>
            <Stack pt="120px">
                <DatingYourActivityBox />
            </Stack>
            <Flex minWidth="max-content" alignItems="center">
                <Box zIndex="3" position="fixed" pl={{ base: "75%", sm: "80%", md: "85%", lg: "70%" }} top="75%">
                    <DatingCreatePollButton />
                </Box>
            </Flex>
        </DatingAppBody>
    )
}

export default YourActivityPoll
