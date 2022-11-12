import { Text, Box, Center, CloseButton, Image, Spacer, Heading, Icon } from "@chakra-ui/react"
import React from "react"
import ReviewContent from "../../../components/restaurant/ReviewContent"
import Searchbar from "../../../components/restaurant/searchbar"
import AppBody from "../../../components/share/app/AppBody"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper"
import ShowImage from "../../../components/restaurant/ShowImage"
import { Link, useParams } from "react-router-dom"
import { Restaurant } from "../data/restaurant"
import { Review } from "../data/review"
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai"

function review() {
    const params = useParams()
    const numres = parseInt(params.reviewRes + "")
    const property = Restaurant.filter((e1) => {
        return e1.id == numres
    })
    const revi = Review.filter((e2) => {
        return e2.resId == numres
    })

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
                {property.map((e1) => {
                    return (
                        <Box px={2} width="full" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Box my={5} textAlign={"center"} fontWeight="bold" fontSize={"2xl"}>
                                <Link to={`/restaurant/detail/${numres}`}>
                                    <CloseButton my={-4} ml={-1} />{" "}
                                </Link>
                                <Heading textAlign={"center"} fontWeight="bold" color={"#E65300"}>
                                    {e1.resName}
                                </Heading>
                            </Box>
                            <ShowImage img={e1.img} />
                            <Box p="4">
                                <Box display="flex" alignItems="baseline" px={{ base: 0, md: 175 }}>
                                    <Box color="" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                                        <Icon as={AiOutlineLike} fontSize="md" />
                                         {e1.amoutOflike} liked
                                    </Box>
                                    <Spacer />
                                    <Box
                                        as="button"
                                        bg={""}
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        px={2}
                                        py={1}
                                    >
                                        <Link to={`/restaurant/detail/${numres}`}>
                                            <Icon as={AiOutlineComment} fontSize="md" />
                                             REVIEW
                                        </Link>
                                    </Box>
                                </Box>
                                {revi.map((e2) => {
                                    return (
                                        <>
                                            <ReviewContent name={e2.name} picture={e2.picture} rate={e2.rate} review={e2.review} />
                                        </>
                                    )
                                })}
                            </Box>
                        </Box>
                    )
                })}
            </Center>
        </AppBody>
    )
}

export default review
