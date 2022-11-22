import { DEFAULT_TAGS } from "src/components/qa/shared/defaultTags"
import { useState } from "react"
import {
    CheckboxGroup,
    useDisclosure,
    Grid,
    Box,
    Heading,
    FormControl,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Flex,
    Spacer,
    VStack,
    Popover,
    PopoverContent,
    PopoverBody,
    PopoverTrigger,
    Textarea,
} from "@chakra-ui/react"

import QAnsAppBody from "../../components/qa/QAnsAppBody"
import QAnsSearchBar from "src/components/qa/QAnsSearchBar"
import QAnsAnonyButton from "src/components/qa/QAnsAnonyButton"
import QAnsInsertfile from "src/components/qa/QAnsInsertfile"
import QAnsTag from "../../components/qa/QAnsTag"

interface state {
    allTags: {
        tagId: number
        tagName: string
    }[]
}

const create = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let TState = { allTags: DEFAULT_TAGS }
    const [numOfTag, setNumOfTag] = useState(0)
    const [selectedTags, setSelectedTag] = useState<String[] | String>([])

    const [tags, setTags] = useState(DEFAULT_TAGS)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <QAnsAppBody>
            <Flex padding={"0.5em"} height={20} alignItems={"baseline"}>
                <Box w="15%">
                    <Heading as="h1" size="2xl" noOfLines={1}>
                        Q & A
                    </Heading>
                </Box>

                <Spacer />

                <Popover>
                    <PopoverTrigger>
                        <Box w="60%">
                            <QAnsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setTags={setTags} DEFAULT_TAGS={DEFAULT_TAGS} />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody>
                            <CheckboxGroup colorScheme="white">
                                {TState.allTags.map(({ tagId, tagName }) => (
                                    <QAnsTag
                                        key={tagId}
                                        tagId={`${tagId}`}
                                        tagName={tagName}
                                        onOpen={onOpen}
                                        selectedTags={selectedTags}
                                        numOfTag={numOfTag}
                                        setNumOfTag={setNumOfTag}
                                        setSelectedTag={setSelectedTag}
                                    />
                                ))}
                            </CheckboxGroup>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>

                <Spacer />

                <Box w="10%">
                    <QAnsAnonyButton />
                </Box>
            </Flex>

            <Flex borderRadius={"100px"}>
                <VStack background={"white"} w={"57.5%"}>
                    <Box bg="white" w="100%" p={"2em"} color="grey" rounded={"50px"}>
                        <FormControl>
                            <Flex>
                                <InputGroup>
                                    {/* <InputLeftElement
                                children={ <Heading size="lg" fontSize="20px">
                                                INPUT_Q&A_Headtitle
                                            </Heading>
                                }
                            /> */}
                                    <Input w={"80%"} size={"lg"} placeholder={"INPUT_Q&A_Headtitle"}></Input>
                                </InputGroup>

                                <Popover>
                                    <PopoverTrigger>
                                        <Button colorScheme={"orange"} w={"20%"}>
                                            Add File
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverBody>
                                            <QAnsInsertfile />
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                            <br></br>

                            <Textarea placeholder="Unlimited text field!" h={"200px"} />
                        </FormControl>
                    </Box>
                </VStack>
                <Spacer />
                <Grid w={"40%"} templateColumns={"repeat(4, 2fr)"}>
                    <CheckboxGroup colorScheme="white">
                        {TState.allTags.map(({ tagId, tagName }) => (
                            <QAnsTag
                                key={tagId}
                                tagId={`${tagId}`}
                                tagName={tagName}
                                onOpen={onOpen}
                                selectedTags={selectedTags}
                                numOfTag={numOfTag}
                                setNumOfTag={setNumOfTag}
                                setSelectedTag={setSelectedTag}
                            />
                        ))}
                    </CheckboxGroup>
                </Grid>
            </Flex>
            <br></br>
            <Flex justifyContent={"flex-end"}>
                <Button colorScheme="green"> Yes </Button>
                <Button colorScheme="red"> No </Button>
            </Flex>
        </QAnsAppBody>
    )
}

export default create
