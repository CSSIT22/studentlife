import { DEFAULT_TAGS } from "src/components/qa/shared/defaultTags"
import { useState } from "react"
import {
    Box,
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
    Wrap, 
} from "@chakra-ui/react"
import QAnsAppBody from "src/components/qa/QAnsAppBody"
import QAnsSearchBar from "src/components/qa/QAnsSearchBar"
import QAnsAnonyButton from "src/components/qa/QAnsAnonyButton"
import QAnsBoxPost from "src/components/qa/QAnsBoxPost"
import QAnsTag from "src/components/qa/QAnsTag"

const index = () => {

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

        <Grid h="1em" templateColumns="5% 50% 31% 5%" gap={"3%"}>
            <HStack>
                <Button colorScheme="orange" size="md">
                    ⇐
                </Button>
            </HStack>

            <VStack>
                    <QAnsBoxPost>
                        <Avatar src="https://cdn.discordapp.com/attachments/1042794237999194153/1042808112274489444/userProfile_1.jpg"></Avatar>
                        <Container>
                            Did Somebody feel like playing futsal with me at KMUTT? " Hi! My name is Puvadet Niyomdaychar, You can call me Pea. I'm a
                            student in CS bachelor at SIT. And I also would like you guys to join me to play football at KMUTT futsal field. You can
                            bring all of your friends and teammates to play together with me. And I'm happy to see you and play with all of you guys,
                            See ya. Cheers! "
                        </Container>
                    </QAnsBoxPost>
                    <Button colorScheme="orange" size="md" w={"60%"}>
                        ➕
                    </Button>
                </VStack>

                <VStack>
                    <QAnsBoxPost>
                        <Avatar src={"https://cdn.discordapp.com/attachments/1042794237999194153/1042808295091613756/userProfile_3.JPG"}></Avatar>
                        "Me , Poopa Kaewbuapun , Play on Striker same major as you. See you Bro."
                        <Avatar src={"https://cdn.discordapp.com/attachments/1042794237999194153/1042808185242791986/userProfile2.jpg"}></Avatar>
                        "I play at Center-Back , Kaweephop is my name."
                    </QAnsBoxPost>
                    <Button colorScheme="orange" size="md" w={"60%"}>
                        ➕
                    </Button>
                </VStack>

            <HStack>
                <Button colorScheme="orange" size="md">
                    ⇒
                </Button>
            </HStack>
        </Grid>
    </QAnsAppBody>
    )
}

export default index
