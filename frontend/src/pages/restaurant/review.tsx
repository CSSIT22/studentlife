import {
    Box,
    Center,
    CloseButton,
    Image,
    Link,

    Spacer,
} from "@chakra-ui/react"
import React from "react"
import ReviewContent from "../../components/restaurant/ReviewContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper"


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
                    <Link href="/restaurant"><CloseButton my={-4} ml={-1} /> </Link> {property.title}
                    </Box>
                    <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
                            <SwiperSlide> <Image
                            borderRadius="3xl"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/800px-Tom%27s_Restaurant%2C_NYC.jpg?20170523012006"
                            width={"auto"}
                            height="400px"
                        ></Image></SwiperSlide>
                            <SwiperSlide>
                                    <Image
                                borderRadius="3xl"
                                src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
                                width={"auto"}
                                height="400px"
                            ></Image>
                        </SwiperSlide>
                            <SwiperSlide> 
                                <Image
                                borderRadius="3xl"
                                src="https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=2000"
                                width={"auto"}
                                height="400px"
                            ></Image>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image
                                    borderRadius="3xl"
                                    src="https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2148999934.jpg?w=2000"
                                    width={"auto"}
                                    height="400px"
                                ></Image>
                            </SwiperSlide>
                            <SwiperSlide>
                            <Image
                                borderRadius="3xl"
                                src="https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000"
                                width={"auto"}
                                height="400px"
                            ></Image>
                            </SwiperSlide>
                        </Swiper>
                        
                    <Box p="4">
                        <Box display="flex" alignItems="baseline">
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
