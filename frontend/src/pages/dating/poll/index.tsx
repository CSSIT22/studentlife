import { Box, Center, HStack, Stack } from "@chakra-ui/react"
import DatingAllActivityBox from "src/components/dating/DatingAllActivityBox"
import DatingAllActivityButton from "src/components/dating/DatingAllActivityButton"
import DatingAppliedActivityButton from "src/components/dating/DatingAppliedActivityButton"
import DatingCreatePollButton from "src/components/dating/DatingCreatePollButton"
import DatingYourActivityButton from "src/components/dating/DatingYourActivityButton"
import DatingAppBody from "../../../components/dating/DatingAppBody"

const AllActivityPoll = () => {
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
                    <HStack gap={{ base: "10px", md: "40px", lg: "40px" }} display="flex" pt="20px">
                        <DatingAllActivityButton backgroundColor={"orange.600"} />
                        <DatingYourActivityButton backgroundColor={"orange.800"} />
                        <DatingAppliedActivityButton backgroundColor={"orange.800"} />
                    </HStack>
                </Box>
            </Center>
            <Stack pt="120px">
                <DatingAllActivityBox />
            </Stack>
            {/* <Box zIndex="2" position="fixed" w="100%" justifyContent="end" top={{ base: 70, md: 157 }}>
                <DatingCreatePollButton />
            </Box> */}
        </DatingAppBody>
    )
}

export default AllActivityPoll
