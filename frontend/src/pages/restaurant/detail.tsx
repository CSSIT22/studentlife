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
    Radio,
    RadioGroup,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineComment, AiOutlineGlobal, AiOutlineHeart, AiOutlineLike, AiOutlinePhone } from "react-icons/ai"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import ShowImage from "../../components/restaurant/ShowImage"
import { SlActionRedo } from "react-icons/sl"
import { useParams, useNavigate, Link, Navigate } from "react-router-dom"
import API from "src/function/API"
import Lottie from 'lottie-react'
import loading1 from './animation/loading1.json'
import notloading2 from './animation/notloading2.json'

function detail() {
    const { onOpen } = useDisclosure()
    const params = useParams()
    const [property, setproperty] = React.useState<any>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getdetail = API.get(`/restaurant/detail?resId=${new URLSearchParams(location.search).get("resId")}`)
    const [radius, setradius] = useState(500);

    useEffect(() => {
        getdetail.then((item) => setproperty(item.data))
            .catch((err) => on())
            .finally(off)

    }, [params.detailRes])

    const selectRadius = (radius: number) => {
        setradius(radius)
    }

    const [room, setRoom] = React.useState<any>()
    const [room2, setRoom2] = React.useState<any>()

    const getRoom = API.get("/chat")
    useEffect(() => {
        getRoom.then((item) => setRoom(item.data))
    }, [setRoom])

    function buffer_to_img(data: any) {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));
        return `data:image/png;base64,${base64String}`
    }
    function handleImg(e: any) {
        if (e === null) {
            return ""
        }
        else {
            return buffer_to_img(e.data)
        }
    }

    function handleGroup(ro: any) {
        if (ro.room.roomType == "INDIVIDUAL") {
            return (
                <Box ><Avatar name={ro?.room?.nick[0]?.nickname} src={handleImg(ro?.room?.nick[0]?.nameWho?.image)} />
                    <Center><Text fontSize={"xs"}>{ro?.room?.nick[0]?.nickname}</Text></Center></Box>

            )
        } else {
            return (
                <Box>
                    <Avatar name={ro?.room?.group.roomName} src={handleImg("")} />
                    <Center><Text fontSize={"xs"}>{ro?.room?.group.roomName}</Text></Center>
                </Box>
            )
        }
    }

    let [isFavorite, setIsFavorite] = useState(Boolean)


    useEffect(() => {
        property.map((el: any) => {
            if (el.userFav.length == 1) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        })
    }, [setIsFavorite, property])

    const addFavorite = () => {
        API.post("/restaurant/detail?resId=" + new URLSearchParams(location.search).get("resId"))
    }

    const navigate = useNavigate()
    const share = () => {
        navigate(`/chat/${room2}?resId=${new URLSearchParams(location.search).get("resId")}`)
    }
    const review = () =>{
        navigate(`/shopreview/shopdetails/restaurant/${new URLSearchParams(location.search).get("resId")}`)
    }

    const nextres = () => {
        navigate(`/restaurant/likeOrNope?radius=${radius}&id=${parseInt(new URLSearchParams(location.search).get("id") + "") + 1 > parseInt(new URLSearchParams(location.search).get("total") + "") - 1 ? 0 : parseInt(new URLSearchParams(location.search).get("id") + "") + 1}`)
    }

    if (isLoading)
        return (
            <AppBody
                secondarynav={[
                    { name: "Like or Nope", to: "/restaurant" },
                    { name: "My Favorite", to: "/restaurant/favorite" },
                    { name: "My History", to: "/restaurant/history" },
                ]}
            >
                <Box w={"100%"} h={"100%"}>
                    <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100%"}>
                        <Lottie animationData={loading1} style={{ scale: 1 }} />
                    </Flex>
                </Box>
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

            <Box width="100%" height="100%">
                <Flex justifyContent={"center"} alignItems={"center"} width="100%" height="100%" mt={"8rem"}>
                    <Lottie animationData={notloading2} style={{ scale: 1 }} />
                </Flex>
            </Box>
        </AppBody>
    )

    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar selectRadius={selectRadius} />
            <Center w={"full"} mt={4}>
                {property.map((e1: any) => {

                    return (
                        <>
                            <Box px={2} width="full" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} boxShadow={"lg"}>
                                <Box my={5}>

                                    <CloseButton my={-1} ml={-1} onClick={() => nextres()} />

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
                                            {/* <Link to={`/restaurant/review?resId=${e1.resId}&id=${new URLSearchParams(location.search).get("id")}`}>
                                                <Box display="flex" verticalAlign={"AiOutlineComment"} pr={2}>
                                                    <Icon as={AiOutlineComment} fontSize="md" /> Review
                                                </Box>
                                            </Link> */}
                                            <a onClick={()=>{review()}}> <Icon as={AiOutlineComment} fontSize="md" /> Review</a>
                                        </Box>
                                    </GridItem>

                                    <GridItem display={"flex"} alignItems={"center"} colSpan={{ base: 8, md: 4 }} fontWeight="600">
                                        <Box w={"full"} textAlign={"center"}>
                                            <Text color="" fontSize="md">
                                                OPEN - CLOSE : {e1.openAt[0]?.open == undefined ? "Unknown" : e1.openAt[0]?.open.substring(0, 2) + ":" + e1.openAt[0]?.open.substring(2, 4)}  {e1.closeAt[0]?.close == undefined ? "" : "-" + e1.closeAt[0]?.close.substring(0, 2) + ":" + e1.closeAt[0]?.close.substring(2, 4)} <br />
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
                                                            <Flex >
                                                                <Wrap spacing="30px">
                                                                    <Grid templateColumns='repeat(5, 2fr)' gap={6} overflowX={"scroll"} maxW={"100%"}>
                                                                        {room?.map((ro: any) => {
                                                                            return (
                                                                                <RadioGroup onChange={setRoom2} value={room2}>
                                                                                    <Radio value={ro.room.roomId}>

                                                                                        <GridItem>
                                                                                            {/* <Avatar name={ro?.room?.nick[0]?.nickname} src={handleImg(ro?.room?.nick[0]?.nameWho?.image)} />
                                                                                            <Center><Text fontSize={"xs"}>{ro?.room?.nick[0]?.nickname}</Text></Center> */}
                                                                                            {handleGroup(ro)}
                                                                                        </GridItem>

                                                                                    </Radio>
                                                                                </RadioGroup>
                                                                            )

                                                                        })}
                                                                    </Grid>
                                                                </Wrap>
                                                            </Flex>


                                                            <Flex my={5}>
                                                                <Button
                                                                    bg={"green.400"}
                                                                    color="white"
                                                                    border={1}
                                                                    borderRadius={"10px"}
                                                                    px={4}
                                                                    py={2}
                                                                    onClick={() => {
                                                                        share()
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
