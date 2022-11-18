import { Box, Center, Flex, HStack, Stack } from "@chakra-ui/react"
import DatingAllActivityBox from "src/components/dating/DatingAllActivityBox"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingCreatePollButton from "src/components/dating/DatingCreatePollButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import DatingAppBody from "../../../components/dating/DatingAppBody"

const AllActivityPoll = () => {
    return (
        <DatingAppBody>
            {/* Combine all Nav buttons */}
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
                    <HStack gap={{ base: "10px", md: "40px", lg: "40px" }} display="flex" pt="20px">
                        <DatingAllActivityButton backgroundColor={"orange.600"} />
                        <DatingYourActivityButton backgroundColor={"orange.800"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.800"} />
                    </HStack>
                </Box>
            </Center>
            {/* Calling all activity poll out (Need to order by time)*/}
            <Stack pt="120px">
                <DatingAllActivityBox />
            </Stack>
            {/* Create poll button */}
            <Box display="flex" justifyContent="center">
                <Box position="fixed" w="100%" justifyContent="end" top={{ base: "77%", md: "85%" }} id="bottomBar">
                    <HStack
                        gap={{ base: "75%", md: "44em", lg: "55em" }}
                        display="flex"
                        justifyContent="center"
                        pt={{ base: "40px", md: "30px" }}
                        pb="30px"
                    >
                        <Box></Box>
                        <DatingCreatePollButton />
                    </HStack>
                </Box>
            </Box>
        </DatingAppBody>
    )
}

export default AllActivityPoll
