import { Box, Center, CloseButton, Image, Link, Spacer } from "@chakra-ui/react"
import React from "react"
import ReviewContent from "../../components/restaurant/ReviewContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper"
import ShowImage from "../../components/restaurant/ShowImage"
import { useParams } from "react-router-dom"

function review() {
    
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

    const reviewer = {
        name: "Elon Malabo",
        picture: "",
        rate: "4",
        review: "This restaurant is so good but it is a little pricey will come back ",
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
            <Center mt={4}>
                <Box px={2} width="full" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Box my={5} textAlign={"center"} fontWeight="bold" fontSize={"2xl"}>
                        <Link href="/restaurant">
                            <CloseButton my={-4} ml={-1} />{" "}
                        </Link>{" "}
                        {property.title}
                    </Box>
                    {/* <ShowImage /> */}
                    <Box p="4">
                        <Box display="flex" alignItems="baseline" px={{ base: 0, md: 175 }}>
                            <Box color="" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                                {property.amountLike} liked &bull;
                            </Box>
                            <Spacer />
                            <Box
                                as="button"
                                bg={""}
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                borderWidth="1px"
                                borderRadius="lg"
                                px={2}
                                py={1}
                            >
                                <Link href="/restaurant/detail">REVIEW</Link>
                            </Box>
                        </Box>
                        <ReviewContent name={reviewer.name} picture={reviewer.name} rate={reviewer.rate} review={reviewer.review} />
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
                        <ReviewContent
                            name={"joji"}
                            picture={""}
                            rate={"4"}
                            review={"This restaurant is so good but it is a little pricey will come back"}
                        />
                    </Box>
                </Box>
            </Center>
        </AppBody>
    )
}

export default review
