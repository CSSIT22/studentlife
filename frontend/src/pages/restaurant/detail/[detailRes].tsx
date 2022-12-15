import {
    Avatar,
    Box,
    Button,
    Center,
    CloseButton,
    Flex,
    Grid,
    GridItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Show,
    Spacer,
    Text,
    useDisclosure,
    Wrap,
    WrapItem,
    Icon,
    Heading,
    useBoolean,
    CheckboxGroup,
    Stack,
    Checkbox,
    FormControl,
    Radio,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineComment, AiOutlineGlobal, AiOutlineHeart, AiOutlineLike, AiOutlinePhone } from "react-icons/ai"
import Searchbar from "../../../components/restaurant/searchbar"
import AppBody from "../../../components/share/app/AppBody"
import ShowImage from "../../../components/restaurant/ShowImage"
import { SlActionRedo } from "react-icons/sl"
import { useParams, useNavigate, Link } from "react-router-dom"
import { friend } from "../data/friend"
import API from "src/function/API"



function detail() {
    const { onOpen } = useDisclosure()
    const params = useParams()
    const [numres, setnumres] = useState(params.detailRes)

    const [property, setproperty] = React.useState<any>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(false)
    const getdetail = API.get("/restaurant/detail/" + params.detailRes)
    useEffect(() => {
        getdetail.then((item) => setproperty(item.data))

    }, [params.detailRes])

    console.log(property)

    if (isLoading)
        return (
            <AppBody
                secondarynav={[
                    { name: "Like or Nope", to: "/restaurant" },
                    { name: "My Favorite", to: "/restaurant/favorite" },
                    { name: "My History", to: "/restaurant/history" },
                ]}
            >
                <Heading color={"black"}>Loading</Heading>
            </AppBody>
        )

    if (isError) return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Heading color={"red"}> There is an Error</Heading>
        </AppBody>
    )

    let [isFavorite, setIsFavorite] = useState(Boolean)

    useEffect(() => {
        property.map((el: any) => {
            console.log(el.userFav.length)
            if (el.userFav.length == 1) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        })
    }, [setIsFavorite, property])

    const submit = () => {
        console.log("papoo")
    }

    friend.map((e1:any)=>{

    })
    



    const addFavorite = () => {
        API.post("/restaurant/detail/" + params.detailRes)
    }


    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar />
            <Center w={"full"} mt={4}>
                {property.map((e1: any) => {
                    return (
                        <>
                            <Box px={2} width="full" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} boxShadow={"lg"}>
                                <Box my={5}>
                                    <Link to={`/restaurant/${numres}`}>
                                        <CloseButton my={-4} ml={-1} />
                                    </Link>

                                    <Heading textAlign={"center"} fontWeight="bold" color={"#E65300"}>
                                        {e1.resName}
                                    </Heading>
                                </Box>

                                <Grid p={{ base: 0, md: 5 }} templateRows="repeat(1, 1fr)" templateColumns="repeat(8, 1fr)" columnGap={4} rowGap={1}>
                                    <GridItem colSpan={{ base: 8, md: 4 }}>
                                        <ShowImage img={e1.images} />

                                        <Box
                                            px={4}
                                            py={3}
                                            display="flex"
                                            fontWeight="semibold"
                                            letterSpacing="wide"
                                            fontSize="xs"
                                            textTransform="uppercase"
                                            pr={6}
                                        >
                                            <Box display="flex" verticalAlign={"AiOutlineLike"}>
                                                <Icon as={AiOutlineLike} fontSize="md" /> {e1.likes} liked
                                            </Box>
                                            <Spacer />
                                            <Link to={`/restaurant/review/${numres}`}>
                                                <Box display="flex" verticalAlign={"AiOutlineComment"} pr={2}>
                                                    <Icon as={AiOutlineComment} fontSize="md" /> Review
                                                </Box>
                                            </Link>
                                        </Box>
                                    </GridItem>

                                    <GridItem display={"flex"} alignItems={"center"} colSpan={{ base: 8, md: 4 }} fontWeight="600">
                                        <Box w={"full"} textAlign={"center"}>
                                            <Text color="" fontSize="md">
                                                OPEN - CLOSE : {e1.openAt[0].open} - {e1.closeAt[0].close} <br />
                                                <Show above="md">
                                                    <br />
                                                </Show>
                                            </Text>

                                            <Text as="span" color="" fontSize="md">
                                                VICINITY : {e1.detail.vicinity} <br />
                                                <Show above="md">
                                                    <br />
                                                </Show>
                                            </Text>

                                            <Text color="" fontSize="md" textTransform="uppercase">
                                                CONTACT :
                                                <br />
                                                <Icon as={AiOutlinePhone} w={4} h={4} /> : <a href="tel:+{e1.detail.phone}">{e1.detail.phoneNo}</a>
                                                <br /> <Icon as={AiOutlineGlobal} w={4} h={4} /> :
                                                <a href={e1.detail.website}>
                                                    <Text as="u">Click here</Text>
                                                </a>
                                            </Text>
                                        </Box>
                                    </GridItem>
                                </Grid>

                                <Box p="5">
                                    <Flex mt={10}>
                                        <Button
                                            bg={"white"}
                                            width="50px"
                                            h="50px"
                                            borderRadius={"full"}
                                            p={0}
                                            onClick={() => {
                                                setIsFavorite(true)
                                                addFavorite()
                                            }}
                                        >
                                            {isFavorite ? <Icon as={AiFillHeart} w={12} h={12} /> : <Icon as={AiOutlineHeart} w={12} h={12} />}
                                        </Button>
                                        <Spacer />
                                        <Popover placement="top">
                                            {({ onClose }: any) => (
                                                <>
                                                    <PopoverTrigger>
                                                        <Button
                                                            as="button"
                                                            bg={""}
                                                            color=""
                                                            h="50px"
                                                            variant="outline"
                                                            borderRadius={"20px"}
                                                            px={4}
                                                            py={1}
                                                            onClick={onOpen}
                                                            borderWidth={2}
                                                            borderColor="blackAlpha.700"
                                                        >
                                                            <Icon as={SlActionRedo} fontSize="md" mr={2} />
                                                            Share
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverHeader fontWeight='semibold' textAlign={"center"}>Share</PopoverHeader>
                                                        <PopoverBody>
                                                            <form action="/chat/">
                                                                
                                                                    <Flex>
                                                                        <Wrap spacing="30px">
                                                                            {friend.map((f1) => {
                                                                                return (
                                                                                <Radio name={f1.Id}> 
                                                                                    <WrapItem>
                                                                                        <Avatar name={f1.name} src={f1.picture} />
                                                                                        <Text></Text>
                                                                                    </WrapItem>
                                                                                </Radio>
                                                                                )
                                                                            })}
                                                                        </Wrap>
                                                                    </Flex>
                                                                
                                            
                                                                <Flex my={5}>
                                                                    <Button
                                                                        type="submit"
                                                                        bg={"green.400"}
                                                                        color="white"
                                                                        border={1}
                                                                        borderRadius={"10px"}
                                                                        px={4}
                                                                        py={2}
                                                                        onClick={() => {submit()
                                                                            
                                                                        }}
                                                                    >
                                                                        OK
                                                                    </Button>
                                                                    <Spacer />
                                                                    <Button
                                                                        bg={"tomato"}
                                                                        color="white"
                                                                        border={1}
                                                                        borderRadius={"10px"}
                                                                        px={2}
                                                                        py={1}
                                                                        onClick={onClose}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </Flex>
                                                            </form>
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </>
                                            )}
                                        </Popover>

                                        <Spacer />
                                        <Box as={Button} to={e1.detail.location} bg={"#E65300"} width="50px" h="50px" color="white" border={1} borderRadius={"full"} p={4}>
                                            <a href={e1.detail.location}>GO</a>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                        </>
                    )
                })}
            </Center>
        </AppBody>
    )
}

export default detail
