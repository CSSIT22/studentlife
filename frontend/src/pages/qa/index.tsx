import QAnsAppBody from "../../components/qa/QAnsAppBody"
import QAnsPost from "../../components/qa/QAnsPost"
import { Heading, Input, Grid, GridItem, Flex } from "@chakra-ui/react"
import QAnsBox from "src/components/qa/QAnsBox"

const index = () => {
    return (
        <QAnsAppBody>
            <Grid h="4em" templateColumns="repeat(4, 2fr)" gap={"50px"}>
                <Heading as="h1" size="2xl" noOfLines={1}>
                    Q & A
                </Heading>

                <Input type="search" placeholder="🔍  Search..." size="md" id="search" />
                <QAnsPost></QAnsPost>
            </Grid>
            <QAnsBox></QAnsBox>
        </QAnsAppBody>
    )
}

export default index
