import { Box, Center, Heading } from "@chakra-ui/react"
import DatingAppBody from "../../../components/dating/DatingAppBody"

const CreateActivityPoll = () => {
    return (
        <DatingAppBody>
            <Box mt="50px" p="50px" bg="orange.200" borderRadius={"20px"}>
                <Heading color={"white"}>Create a poll</Heading>
                <Center></Center>
            </Box>
        </DatingAppBody>
    )
}

export default CreateActivityPoll
