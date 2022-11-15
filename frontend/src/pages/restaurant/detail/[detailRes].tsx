import {
    Avatar,
    Box,
    Button,
    Center,
    CloseButton,
    Flex,
    Grid,
    GridItem,
    Hide,
    Image,
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
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { AiFillGift, AiFillHeart, AiFillPhone, AiOutlineComment, AiOutlineGlobal, AiOutlineHeart, AiOutlineLike, AiOutlinePhone } from "react-icons/ai"
import { BiHeartCircle, BiPhone } from "react-icons/bi"
import Searchbar from "../../../components/restaurant/searchbar"
import AppBody from "../../../components/share/app/AppBody"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper"
import ShowImage from "../../../components/restaurant/ShowImage"
import { Md10K } from "react-icons/md"
import ReviewContent from "../../../components/restaurant/ReviewContent"
import { SlActionRedo } from "react-icons/sl"
import { Restaurant } from ".././data/restaurant"
import { useParams, Link } from "react-router-dom"
import { friend } from "../data/friend"

function detail() {

    // const friendInfo = friend.filter((shareInfo) => {})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams()
    const [numres, setnumres] = useState(parseInt(params.detailRes + ""));
    const property = Restaurant.filter((e1) => {
        return e1.id == parseInt(params.detailRes + "")
    })

    const addFavorite = () => {
        console.log( Restaurant[numres].status);
        Restaurant[numres].status = true
        console.log( Restaurant[numres].status);
        
    }

    // const nextPage = () => {
    //     if (numres < Restaurant.length - 2) {
    //         setnumres(numres + 1)
    //     }
    //     else{
    //         setnumres(0)
    //     }
    // }
    
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        console.log(isFavorite);
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
                {property.map((e1) => {
                    return (
                        <>
                            <Box px={2} width="full" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} boxShadow={"lg"}>
                                <Box my={5}>
                                    <Link to={`/restaurant/${numres == Restaurant.length - 1? 0: numres + 1}`}>
                                        <CloseButton my={-4} ml={-1} />
                                    </Link>

                                    <Heading textAlign={"center"} fontWeight="bold" color={"#E65300"}>
                                        {e1.resName}
                                    </Heading>
                                </Box>

                                <Grid p={{ base: 0, md: 5 }} templateRows="repeat(1, 1fr)" templateColumns="repeat(8, 1fr)" columnGap={4} rowGap={1}>
                                    <GridItem colSpan={{ base: 8, md: 4 }}>
                                        <ShowImage img={e1.img} />
                                        <Box px={4} py={3} display="flex" alignItems="baseline">
                                            <Box fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                                                <Icon as={AiOutlineLike} fontSize="md" /> {e1.amoutOflike} liked
                                            </Box>
                                            <Spacer />
                                            <Center
                                                as="button"
                                                bg={""}
                                                fontWeight="semibold"
                                                letterSpacing="wide"
                                                fontSize="xs"
                                                textTransform="uppercase"
                                                borderWidth=""
                                                borderRadius=""
                                                px={2}
                                                pt={1}
                                                pb={1}
                                            >
                                                <Link to={`/restaurant/review/${numres}`}>
                                                    <Icon as={AiOutlineComment} fontSize="md" /> REVIEW
                                                </Link>
                                            </Center>
                                        </Box>
                                    </GridItem>

                                    <GridItem display={"flex"} alignItems={"center"} colSpan={{ base: 8, md: 4 }}>
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
                                        <Button bg={"white"} width="50px" h="50px" borderRadius={"full"} p={0} onClick={()=>{setIsFavorite(!isFavorite); setFavoriteStatus}}>
                                            {isFavorite ? <AiFillHeart size={"full"}/> : <AiOutlineHeart size={"full"} />}
                                        </Button>
                                        <Spacer />
                                        {/* {friendInfo.map((shareInfo) => {
                                            return ( */}
                                        <Popover placement="top">
                                            {({ isOpen, onClose }) => (
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
                                                        >
                                                            <Icon as={SlActionRedo} fontSize="md" />
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
                                                                            return   (
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
                                        {/* )
                                        })} */}

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
