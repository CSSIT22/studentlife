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
declare global {
    var respage: number
}

function detail() {
    const {onOpen} = useDisclosure()
    const params = useParams()
    const [numres, setnumres] = useState(parseInt(params.detailRes + ""))
    // const property = Restaurant.filter((e1) => {
    //     return e1.id == parseInt(params.detailRes + "")
    // })
    const [property, setproperty] = React.useState<any>([])

    // const addFavorite = () => {
    //     console.log(Restaurant[numres].status)
    //     Restaurant[numres].status = true
    //     console.log(Restaurant[numres].status)
    // }


    useEffect(() => {
        API.get("/restaurant/detail/" + params.detailRes).
        then((item) => setproperty(item.data))
    }, [params.detailRes])

    console.log(property)

    globalThis.respage = numres

    const [isFavorite, setIsFavorite] = useState(false)
    useEffect(() => {
        console.log(isFavorite)
    }, [isFavorite])
    const setFavoriteStatus = () => {
        console.log(isFavorite)
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
                                    <Link to={`/restaurant/${globalThis.respage}`}>
                                        <CloseButton my={-4} ml={-1} />
                                    </Link>

                                    <Heading textAlign={"center"} fontWeight="bold" color={"#E65300"}>
                                        {e1.resName}
                                    </Heading>
                                </Box>

                                <Grid p={{ base: 0, md: 5 }} templateRows="repeat(1, 1fr)" templateColumns="repeat(8, 1fr)" columnGap={4} rowGap={1}>
                                    <GridItem colSpan={{ base: 8, md: 4 }}>
                                        <ShowImage img={e1.img} />

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
                                                <Icon as={AiOutlineLike} fontSize="md" /> {e1.amountOflike} liked
                                            </Box>
                                            <Spacer />
                                            <Link to={`/restaurant/review/${globalThis.respage}`}>
                                                <Box display="flex" verticalAlign={"AiOutlineComment"} pr={2}>
                                                    <Icon as={AiOutlineComment} fontSize="md" /> Review
                                                </Box>
                                            </Link>
                                        </Box>
                                    </GridItem>

                                    <GridItem display={"flex"} alignItems={"center"} colSpan={{ base: 8, md: 4 }} fontWeight="600">
                                        <Box w={"full"} textAlign={"center"}>
                                            <Text color="" fontSize="md">
                                                OPEN - CLOSE : {e1.open} - {e1.close} <br />
                                                <Show above="md">
                                                    <br />
                                                </Show>
                                            </Text>

                                            <Text as="span" color="" fontSize="md">
                                                STYLE : {e1.vicinity} <br />
                                                <Show above="md">
                                                    <br />
                                                </Show>
                                            </Text>

                                            <Text color="" fontSize="md" textTransform="uppercase">
                                                CONTACT :
                                                <br />
                                                <Icon as={AiOutlinePhone} w={4} h={4} /> : <a href="tel:+{e1.phone}">{e1.phone}</a>
                                                <br /> <Icon as={AiOutlineGlobal} w={4} h={4} /> :
                                                <Link to={e1.website}>
                                                    <Text as="u">Click here</Text>
                                                </Link>
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
                                                setIsFavorite(!isFavorite)
                                                setFavoriteStatus
                                            }}
                                        >
                                            {isFavorite ? <AiFillHeart size={"full"} /> : <AiOutlineHeart size={"full"} />}
                                        </Button>
                                        <Spacer />
                                        <Popover placement="top">
                                            {({onClose}) => (
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
                                                            borderColor="black"
                                                        >
                                                            <Icon as={SlActionRedo} fontSize="md" mr={2} />
                                                            Share
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverHeader textAlign={"center"}>Share</PopoverHeader>
                                                        <PopoverBody>
                                                            <Flex>
                                                                <Wrap spacing="30px">
                                                                    {friend.map((f1) => {
                                                                        return (
                                                                            <WrapItem>
                                                                                <Avatar as={"button"} name={f1.name} src={f1.picture} />
                                                                            </WrapItem>
                                                                        )
                                                                    })}
                                                                </Wrap>
                                                            </Flex>
                                                        </PopoverBody>
                                                        <PopoverFooter>
                                                            <Flex my={2}>
                                                                <Box
                                                                    as="button"
                                                                    bg={"green.400"}
                                                                    color="white"
                                                                    border={1}
                                                                    borderRadius={"5px"}
                                                                    px={4}
                                                                    py={2}
                                                                    onClick={onClose}
                                                                >
                                                                    OK
                                                                </Box>
                                                                <Spacer />
                                                                <Box
                                                                    as="button"
                                                                    bg={"tomato"}
                                                                    color="white"
                                                                    border={1}
                                                                    borderRadius={"5px"}
                                                                    px={2}
                                                                    py={1}
                                                                    onClick={onClose}
                                                                >
                                                                    Cancel
                                                                </Box>
                                                            </Flex>
                                                        </PopoverFooter>
                                                    </PopoverContent>
                                                </>
                                            )}
                                        </Popover>

                                        <Spacer />
                                        <Button bg={"#E65300"} width="50px" h="50px" color="white" border={1} borderRadius={"full"} p={4}>
                                            <Link to="https://www.google.co.th/maps/">GO</Link>
                                        </Button>
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
