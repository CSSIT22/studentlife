import QAnsAppBody from "../../components/qa/QAnsAppBody"
import QAnsPost from "../../components/qa/QAnsPost"
import { Heading, Input, Grid, GridItem, Flex, Button } from "@chakra-ui/react"
import QAnsBox from "src/components/qa/QAnsBox"
import QAnsInsertfile from "src/components/qa/QAnsInsertfile"

const index = () => {
    return (
        <QAnsAppBody>
            
            <Grid h="4em" templateColumns="repeat(4, 2fr)" gap={"50px"}>
                <Heading as="h1" size="2xl" noOfLines={1}>
                    Q & A
                </Heading>

                {/* <Input type="search" placeholder="🔍  Search..." size="md" id="search" /> */}
                <QAnsPost></QAnsPost>
            </Grid>
            <Input type="search" placeholder="🔍  Search..." size="md" id="search" />
            < Grid h="1em" templateColumns='repeat(2, 1fr)' gap={"10px"} >
    
            <QAnsBox></QAnsBox>
            <QAnsBox></QAnsBox>
            <Button colorScheme="orange" size="md">
            ➕
            </Button>
            <Button colorScheme="orange" size="md">
            ➕
            </Button>
            </Grid>
            
        </QAnsAppBody>
    )
}

export default index
