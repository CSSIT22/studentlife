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
} from "@chakra-ui/react"
import React, { useState } from "react"
import { AiFillGift, AiFillPhone, AiOutlineGlobal, AiOutlineHeart } from "react-icons/ai"
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
    const shareInfo = {
        name1: "realไร่",
        picture1: "https://cdn.discordapp.com/attachments/900658140704559116/1023630299717963848/92C5C070-F9DC-44BA-AF57-F4162FFDCA03.jpg",
        name2: "ยืนหนึง",
        picture2: "https://cdn.discordapp.com/attachments/900658140704559116/1023887278273208360/2FB66B55-BCAA-4DE2-BE62-02B193D6369E.jpg",
        name3: "ผมรู้ผมเห็น",
        picture3: "https://cdn.discordapp.com/attachments/900658140704559116/1022175158334656573/IMG_20220918_224548.jpg",
        name4: "Night N",
        picture4: "",
        name5: "Pun J",
        picture5: "",
        name6: "Ping T",
        picture6: "",
        name7: "Eve N",
        picture7: "",
        name8: "Bung K",
        picture8: "",
    }
    // const friendInfo = friend.filter((shareInfo) => {})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams()
    const numres = parseInt(params.detailRes + "")
    const property = Restaurant.filter((e1) => {
        return e1.id == parseInt(params.detailRes + "")
    })

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
                                    <Link to={`/restaurant/review/${numres}`}>
                                        <CloseButton my={-4} ml={-1} />
                                    </Link>
                                    <Text textAlign={"center"} fontWeight="bold" fontSize={"2xl"} color={"#E65300"}>
                                        {e1.resName}
                                    </Text>
                                </Box>

                                <Grid p={{ base: 0, md: 5 }} templateRows="repeat(1, 1fr)" templateColumns="repeat(8, 1fr)" columnGap={4} rowGap={1}>
                                    <GridItem colSpan={{ base: 8, md: 4 }}>
                                        <ShowImage img={e1.img} />
                                        <Box px={4} py={3} display="flex" alignItems="baseline">
                                            <Box color="" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                                                {e1.amoutOflike} liked
                                            </Box>
                                            <Spacer />
                                            <Center
                                                as="button"
                                                bg={"primary.600"}
                                                fontWeight="semibold"
                                                letterSpacing="wide"
                                                fontSize="xs"
                                                textTransform="uppercase"
                                                borderWidth="1px"
                                                borderRadius="5px"
                                                px={2}
                                                pt={1}
                                                pb={1}
                                            >
                                                <Link to={`/restaurant/review/${numres}`}>REVIEW</Link>
                                            </Center>
                                        </Box>
                                    </GridItem>

                                    <GridItem colSpan={{ base: 8, md: 4 }}>
                                        <Box w={"full"} px={"7"} py={5} borderRadius="10px">
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
                                                <Icon as={AiFillPhone} w={4} h={4} /> : {e1.phone}
                                                <br /> <Icon as={AiOutlineGlobal} w={4} h={4} /> :{" "}
                                                <Link to={e1.website}>
                                                    <Text as="u">Click here</Text>
                                                </Link>
                                            </Text>
                                        </Box>
                                    </GridItem>
                                </Grid>

                                <Box p="5">
                                    <Flex mt={10}>
                                        <Button bg={"tomato"} color="white" width="50px" h="50px" border={1} borderRadius={"full"} p={4}>
                                            <AiOutlineHeart size={"full"} />
                                        </Button>
                                        <Spacer />
                                        {/* {friendInfo.map((shareInfo) => {
                                            return ( */}
                                        <Popover placement="top">
                                            {({ isOpen, onClose }) => (
                                                <>
                                                    <PopoverTrigger>
                                                        <Center
                                                            as="button"
                                                            bg={"gray.300"}
                                                            color="gray.700"
                                                            h="50px"
                                                            border={1}
                                                            borderRadius={"5px"}
                                                            px={4}
                                                            py={1}
                                                            onClick={onOpen}
                                                        >
                                                            <Icon as={SlActionRedo} w={4} h={4} />
                                                            Share
                                                        </Center>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverHeader textAlign={"center"}>Share</PopoverHeader>
                                                        <PopoverBody>
                                                            <Flex>
                                                                <Wrap spacing="30px">
                                                                    <WrapItem
                                                                        _hover={{
                                                                            background: "red.600",
                                                                            color: "teal.500",
                                                                            borderRadius: "22px",
                                                                        }}
                                                                    >
                                                                        <Avatar as={"button"} name={shareInfo.name1} src={shareInfo.picture1} />
                                                                    </WrapItem>
                                                                    <WrapItem>
                                                                        <Avatar as={"button"} name={shareInfo.name2} src={shareInfo.picture2} />
                                                                    </WrapItem>
                                                                    <WrapItem>
                                                                        <Avatar as={"button"} name={shareInfo.name3} src={shareInfo.picture3} />
                                                                    </WrapItem>
                                                                    <WrapItem>
                                                                        <Avatar as={"button"} name={shareInfo.name4} src={shareInfo.picture4} />
                                                                    </WrapItem>
                                                                    <WrapItem>
                                                                        <Avatar as={"button"} name={shareInfo.name5} src={shareInfo.picture5} />
                                                                    </WrapItem>
                                                                    <WrapItem>
                                                                        <Avatar as={"button"} name={shareInfo.name6} src={shareInfo.picture6} />
                                                                    </WrapItem>
                                                                    <WrapItem>
                                                                        <Avatar as={"button"} name={shareInfo.name7} src={shareInfo.picture7} />
                                                                    </WrapItem>
                                                                    <WrapItem>
                                                                        <Avatar as={"button"} name={shareInfo.name8} src={shareInfo.picture8} />
                                                                    </WrapItem>
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
                                        <Button bg={"green.400"} width="50px" h="50px" color="white" border={1} borderRadius={"full"} p={4}>
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
