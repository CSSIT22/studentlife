import { DEFAULT_TAGS } from "src/components/qa/shared/defaultTags"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
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
import QAnsAnonyButton from "src/components/qa/QAnsAnonyButton"
import QAnsInsertfile from "src/components/qa/QAnsInsertfile"
import QAnsTag from "../../components/qa/QAnsTag"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"

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

    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")

    const user = useContext(authContext)
    const nav = useNavigate()

    const submit = () => {
        const form = new FormData()
        form.append("title", title)
        console.log(title)
        form.append("desc", desc)
        console.log(desc)
        API.post<any>("/qa/create/"+user.userId,
            {title,desc}
        ).then((res) => (nav("/qa/myquestions/"+user.userId)))
    }

    return (
        <QAnsAppBody>
            <Flex padding={"0.5em"} height={20} alignItems={"baseline"}>
                <Box w="15%" >
                    <Heading as="h1" size="2xl" noOfLines={1}>
                        Q & A
                    </Heading>
                </Box>

                <Spacer />

                <Box w="10%">
                    <QAnsAnonyButton />
                </Box>
            </Flex>

            <Flex borderRadius={"100px"} >
                <VStack background={"white"} w={"57.5%"}>
                    <Box bg="white" w="100%" p={"2em"} color="grey" rounded={"100px"}>
                        <FormControl>
                            <Flex>
                                <InputGroup>
                                    {/* <InputLeftElement
                                children={ <Heading size="lg" fontSize="20px">
                                                INPUT_Q&A_Headtitle
                                            </Heading>
                                }
                            /> */}
                                    <Input w={"80%"} size={"lg"} placeholder={"INPUT_Q&A_Headtitle"} onChange={e => settitle(e.target.value)}></Input>
                                </InputGroup>

                                <Popover>
                                    <PopoverTrigger>
                                        <Button colorScheme={"orange"} w={"20%"} variant='outline'>
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

                            <Textarea placeholder="Unlimited text field!" h={"200px"} onChange={e => setdesc(e.target.value)} />
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
                <Button colorScheme="orange" size='lg' onClick={submit}> Submit </Button>
            </Flex>
        </QAnsAppBody>
    )
}

export default create
