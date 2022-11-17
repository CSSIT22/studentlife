import QAnsAppBody from "../../components/qa/QAnsAppBody"
import QAnsPost from "../../components/qa/QAnsPost"
import { Heading, Input, Grid, Flex, Button, Box, Spacer } from "@chakra-ui/react"
import QAnsBox from "src/components/qa/QAnsBox"
import QAnsInsertfile from "src/components/qa/QAnsInsertfile"

const index = () => {
    return (
        <QAnsAppBody>
            
            <Flex padding={5}>
                <Box w='30%' h='30'>
                    <Heading as="h1" size="2xl" noOfLines={1}>
                        Q & A
                    </Heading>
                </Box>
                    <Spacer />
                <Box w='60%' h='30' padding={2}>
                    <Input type="search" placeholder="🔍  Search..." size="md" id="search" />
                </Box>
                    <Spacer />
                <Box w='10%' h='30' padding={4}>
                    <QAnsPost></QAnsPost>
                </Box>
            </Flex>

            <Grid>
                <QAnsBox></QAnsBox>
                <Button colorScheme="orange" size="md">
                    ➕
                </Button>
            </Grid>
            
        </QAnsAppBody>
    )
}

export default index
