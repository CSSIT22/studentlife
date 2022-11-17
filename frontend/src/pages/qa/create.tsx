import { DEFAULT_TAGS } from "src/components/qa/shared/defaultTags"
import { CheckboxGroup, useDisclosure, Flex, Spacer, Box, Heading, Input, Grid, Button, ButtonGroup } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react"
import { useState } from "react"
import QAnsAppBody from "../../components/qa/QAnsAppBody"
import QAnsTag from "../../components/qa/QAnsTag"
import QAnsPost from "../../components/qa/QAnsPost"

interface state {
    allTags: {
        tagId: string
        tagName: string
    }[]
}

const TagQA = () => {
    // Used for DatingInterestModal & DatingInterestTag components to trigger the modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    // All states which are used for DatingInterestDynamicButton and DatingInterestTag components
    // to be used with some functions & Some of them are used in this file.
    let TState = { allTags: DEFAULT_TAGS }
    const [searchQuery, setSearchQuery] = useState("")
    const [numOfTag, setNumOfTag] = useState(0)
    const [selectedTags, setSelectedTag] = useState<String[] | String>([])

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

            <CheckboxGroup colorScheme="white">
                {TState.allTags.map(({ tagId, tagName }) => (
                    // DatingInterestTag component: Used for generating interactive tag
                    <QAnsTag
                        key={tagId}
                        tagId={tagId}
                        tagName={tagName}
                        onOpen={onOpen}
                        selectedTags={selectedTags}
                        numOfTag={numOfTag}
                        setNumOfTag={setNumOfTag}
                        setSelectedTag={setSelectedTag}
                    />
                ))}
            </CheckboxGroup>

            <Box bg="white" w="100%" p={100} color="grey">
                <Heading size="lg" fontSize="30px">
                    Q&A Headtitle
                </Heading>
                <br></br>
                <FormControl>
                    <Input placeholder="Create Your Post Here..." />
                </FormControl>
                <br></br>
                <Button colorScheme="green"> Yes </Button>
                <Button colorScheme="red"> No </Button>
            </Box>
        </QAnsAppBody>
    )
}

export default TagQA