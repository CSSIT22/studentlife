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
    Link,
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
} from "@chakra-ui/react"
import React from "react"
import { AiFillPhone, AiOutlineGlobal, AiOutlineHeart } from "react-icons/ai"
import { BiHeartCircle, BiPhone } from "react-icons/bi"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper"
import ShowImage from "../../components/restaurant/ShowImage"
import { Md10K } from "react-icons/md"
import ReviewContent from "src/components/restaurant/ReviewContent"

function detail() {
    const property = {
        imageUrl: "https://cdn.discordapp.com/attachments/900658140704559116/1025051073842532412/received_1863984997105459.jpg",
        imageAlt: "view of the restaurant",
        amountLike: 103,
        openTime: "08.30",
        closeTime: "20.00",
        title: "Restaurant name",
        style: "Japanese",
        phoneNum: "0948426152",
        website: "https://www.instagram.com/nn_nattawat/",
        rating: 4,
    }
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
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                <Box px={2} width="full" borderWidth="1px" borderRadius="lg">
                    <Box my={5} textAlign={"center"} fontWeight="bold" fontSize={"2xl"}>
                        <Link href="/restaurant">
                            <CloseButton my={-4} ml={-1} />
                        </Link>
                        {property.title}
                    </Box>

                    <Grid p={{ base: 0, md: 5 }} templateRows="repeat(1, 1fr)" templateColumns="repeat(9, 1fr)" columnGap={1} rowGap={1}>
                        <GridItem colSpan={{ base: 9, md: 3 }}>
                            <ShowImage />
                            <Box px={4} py={3} display="flex" alignItems="baseline">
                                <Box color="" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                                    {property.amountLike} liked &bull;
                                </Box>
                                <Spacer />
                                <Box
                                    as="button"
                                    bg={"gray.300"}
                                    color="gray.700"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    px={2}
                                    pt={1}
                                >
                                    <Link href="/restaurant/review">REVIEW</Link>
                                </Box>
                            </Box>
                        </GridItem>

                        <GridItem colSpan={{ base: 9, md: 3 }}>
                            <Box w={"full"} backgroundColor={"white"} px={"7"} py={5} borderRadius="10px" shadow={"md"}>
                                <Text color="" fontSize="md">
                                    OPEN - CLOSE : {property.openTime} - {property.closeTime} <br />
                                    <Show above="md">
                                        <br />
                                    </Show>
                                </Text>

                                <Text as="span" color="" fontSize="md">
                                    STYLE : {property.style} <br />
                                    <Show above="md">
                                        <br />
                                    </Show>
                                </Text>

                                <Text color="" fontSize="md" textTransform="uppercase">
                                    CONTACT :
                                    <br />
                                    <AiFillPhone /> : {property.phoneNum}
                                    <br /> <AiOutlineGlobal /> :
                                    <Link href={property.website} isExternal>
                                        <Text as="u">Click here</Text>
                                    </Link>
                                </Text>
                            </Box>
                        </GridItem>

                        <Show above="md">
                            <GridItem colSpan={3}>
                                <Box w={"full"}>
                                    <Swiper
                                        direction={"vertical"}
                                        slidesPerView={"auto"}
                                        freeMode={true}
                                        scrollbar={true}
                                        mousewheel={true}
                                        modules={[FreeMode, Scrollbar, Mousewheel]}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide>
                                            <Box p={5}>
                                                <ReviewContent
                                                    name={"joji"}
                                                    picture={""}
                                                    rate={"4"}
                                                    review={"This restaurant is so good but it is a little pricey will come back"}
                                                />
                                                <ReviewContent
                                                    name={"joji"}
                                                    picture={""}
                                                    rate={"4"}
                                                    review={"This restaurant is so good but it is a little pricey will come back"}
                                                />
                                            </Box>
                                        </SwiperSlide>
                                    </Swiper>
                                </Box>
                            </GridItem>
                        </Show>
                    </Grid>

                    <Box p="5">
                        <Flex mt={10}>
                            <Button bg={"tomato"} color="white" width="50px" h="50px" border={1} borderRadius={"full"} p={4}>
                                <AiOutlineHeart size={"full"} />
                            </Button>
                            <Spacer />
                            <Popover placement="top">
                                {({ isOpen, onClose }) => (
                                    <>
                                        <PopoverTrigger>
                                            <Button
                                                bg={"gray.300"}
                                                color="gray.700"
                                                h="50px"
                                                border={1}
                                                borderRadius={"md"}
                                                px={6}
                                                py={1}
                                                onClick={onOpen}
                                            >
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
                                                        <WrapItem>
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
                                                        borderRadius={"md"}
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
                                                        borderRadius={"md"}
                                                        px={4}
                                                        py={2}
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
                            <Button bg={"green.400"} width="50px" h="50px" color="white" border={1} borderRadius={"full"} p={4}>
                                <Link href="https://www.google.co.th/maps/">GO</Link>
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Center>
        </AppBody>
    )
}

export default detail
