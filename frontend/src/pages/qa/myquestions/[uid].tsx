import { DEFAULT_TAGS } from "src/components/qa/shared/defaultTags"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    Box,
    Image,
    Center,
    Container,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Flex,
    Spacer,
    Button,
    Grid,
    useBreakpointValue,
    VStack,
    HStack,
    PopoverContent,
    Popover,
    PopoverBody,
    CheckboxGroup,
    PopoverTrigger,
    useDisclosure,
    AvatarBadge,
    AvatarGroup,
    Wrap, Tag, FormControl, FormLabel, Textarea
} from "@chakra-ui/react"
import QAnsAppBody from "src/components/qa/QAnsAppBody"
import QAnsSearchBar from "src/components/qa/QAnsSearchBar"
import QAnsAnonyButton from "src/components/qa/QAnsAnonyButton"
import QAnsBoxPost from "src/components/qa/QAnsBoxPost"
import QAnsTag from "src/components/qa/QAnsTag"
import API from "src/function/API"
import tumpup from "../../../components/qa/img/upAnt.jpg"
import tumpdown from "../../../components/qa/img/downSadAnt.jpg"
import reply from "../../../components/qa/img/reply.jpg"
import { authContext } from "src/context/AuthContext"
import bin from "../../../components/qa/img/bin.png"

const myquestions = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let TState = { allTags: DEFAULT_TAGS }
    const [numOfTag, setNumOfTag] = useState(0)
    const [selectedTags, setSelectedTag] = useState<String[] | String>([])

    const [tags, setTags] = useState(DEFAULT_TAGS)
    const [searchQuery, setSearchQuery] = useState("")

    const [questions, setquestions] = useState<any>({})
    const [allquestions, setallquestions] = useState<any>([])
    const [qId, setqId] = useState<any>(0)

    const [ansment, setansment] = useState()

    const params = useParams()
    const user = useContext(authContext)
    const nav = useNavigate()

    useEffect(() => {
        API.get("/qa/myquestions/" + params.uid).then(dataqa => { setquestions(dataqa.data.questions[0]); setallquestions(dataqa.data.questions) })
    }, [])
    useEffect(() => {
        setquestions(allquestions[qId])
    }, [qId])

    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    const del = (qid: any) => {
        console.log(qid)
        API.delete("/qa/myquestions/" + qid,
        ).then((res) => (window.location.reload()))
    }

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

            <Grid h="1em" templateColumns="5% 50% 31% 5%" gap={"3%"}>
                <HStack>
                    {qId > 0 && <Button colorScheme="orange" size="md" onClick={() => setqId(qId - 1)}>
                        ⇐
                    </Button>}
                </HStack>

                <VStack>
                    <QAnsBoxPost>
                        <VStack alignItems="flex-start" overflow="auto">
                            <HStack gap={'5px'}>
                                <Avatar src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + questions?.qCreator?.userId}></Avatar>
                                <Text variant="h3" as='b' color={'#2B547E'}>{questions?.qCreator?.fName} {questions?.qCreator?.lName}</Text>
                                <Box as="button" onClick={() => del(questions?.qId)}>
                                    <Image src={bin} w='35px' h='20px' boxSize='20px' />
                                </Box>
                            </HStack>
                            <Text variant="h1" fontSize='20px' paddingLeft="40px" as='b' color={'#2B547E'}>{questions?.qTitle}</Text>
                            <HStack>
                                {
                                    questions?.tags?.map((quesTag: any) => (
                                        <Tag colorScheme='orange' fontSize={'17px'}>{quesTag.tagIs?.tagName}</Tag>
                                    ))
                                }
                            </HStack>
                            <HStack>
                                <VStack minW='55px' padding={'10px'}>
                                    <Box as='button'>
                                        <Image src={tumpup} w='35px' h='35px' boxSize='35px' />
                                    </Box>
                                    <Text as='b' fontSize={'25px'} color={'#2B547E'}>{questions?.voteCount}</Text>
                                    <Box as='button'>
                                        <Image src={tumpdown} boxSize='35px' w='35px' h='35px' />
                                    </Box>
                                </VStack>
                                <Text fontSize={'18px'} >{questions?.qDesc}</Text>
                            </HStack>

                            {/* <HStack justifyContent="space-around" style={{ width: "100%" }}>
                                <img style={{ maxHeight: 180 }} src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5yHBHPYWn3bHIS2hYoC0VEIg47nx3Z94wfmLBX6RNqdZCZGMAiZ.jpg"></img>
                            </HStack> */}

                            <VStack paddingLeft="12">
                                {questions?.comments &&
                                    questions?.comments?.map((item: any) => <HStack key={item.commentId} gap="5px">
                                        <Avatar src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + item.commentor.userId}></Avatar>
                                        <VStack alignItems="flex-start">
                                            <Text as='b'>{item.commentor.fName} {item.commentor.lName} </Text>
                                            <p>{item.comment}</p>
                                        </VStack>
                                    </HStack>)
                                }
                            </VStack>
                        </VStack>
                    </QAnsBoxPost>

                </VStack>

                <VStack >
                    <QAnsBoxPost>
                        <Text fontSize={'20px'} as='b' color={'#2B547E'}>Answers</Text>
                        <VStack overflow="scroll">
                            <HStack>
                                <VStack bg="grey.100" shadow={"md"} gap={'10px'} borderRadius='md'>
                                    {questions?.answers &&
                                        questions?.answers?.map((item: any) =>
                                            <VStack bg='white' p={5} key={item.answerId} borderBottom={"10px solid"} borderColor={"gray.100"} >
                                                <HStack>
                                                    <Avatar src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + item.aCreator.userId}></Avatar>
                                                    <Text as='b'>{item.aCreator.fName} {item.aCreator.lName}</Text>
                                                </HStack>
                                                <p>{item.text}</p>
                                                
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Box as={"button"} paddingLeft='100px' >
                                                            <Image src={reply} boxSize={'25px'} />
                                                        </Box>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverBody>
                                                            <FormControl>
                                                                <FormLabel>Your Answer Comment</FormLabel>
                                                                <Textarea placeholder="Your Answer Comment..." h={"200px"} onChange={(e: any) => setansment(e.target.value)} />
                                                            </FormControl>

                                                            <Button colorScheme='blue' mr={3}>AnsMent'd</Button>
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Popover>

                                                <VStack paddingLeft="12">
                                                    {item?.comments &&
                                                        item?.comments?.map((item: any) => <HStack key={item.commentId} gap="5px">

                                                            <VStack alignItems="flex-start">
                                                                <HStack>
                                                                    <Avatar src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + item.commentor.userId}></Avatar>

                                                                    <Text as='b'>{item.commentor.fName} {item.commentor.lName} </Text>
                                                                </HStack>
                                                                <p>{item.comment}</p>
                                                            </VStack>
                                                        </HStack>)
                                                    }
                                                </VStack>


                                            </VStack>

                                        )}
                                </VStack>
                            </HStack>

                        </VStack>
                    </QAnsBoxPost>

                </VStack>

                <HStack>
                    {qId < allquestions.length - 1 && <Button colorScheme="orange" size="md" onClick={() => setqId(qId + 1)}>
                        ⇒
                    </Button>}
                </HStack>
            </Grid >
        </QAnsAppBody >
    )
}

export default myquestions
