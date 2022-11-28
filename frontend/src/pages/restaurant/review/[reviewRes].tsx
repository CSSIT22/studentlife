import { Text, Box, Center, CloseButton, Image, Spacer, Heading, Icon } from "@chakra-ui/react"
import React, { useEffect } from "react"
import ReviewContent from "../../../components/restaurant/ReviewContent"
import Searchbar from "../../../components/restaurant/searchbar"
import AppBody from "../../../components/share/app/AppBody"
import ShowImage from "../../../components/restaurant/ShowImage"
import { Link, useParams } from "react-router-dom"
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai"
import API from "src/function/API"

function review() {
    const params = useParams()
    const numres = params.reviewRes
    // const property = Restaurant.filter((e1) => {
    //     return e1.id == numres
    // })
    const [property, setproperty] = React.useState<any>([])
    // const [revi, setrevi] = React.useState<any>([])

    // const revi = Review.filter((e2) => {
    //     return e2.resId == numres
    // })
    // console.log(revi)


    useEffect(() => {
        API.get("/restaurant/review/" + params.reviewRes).then((item) => setproperty(item.data))
    }, [params.reviewRes])
    console.log(property)
    property.reviews?.map((e2: any) => {
        console.log(e2)
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
            <Center mt={4}>
                {property.map((e1: any) => {

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
                            <ShowImage img={e1.images} />
                            <Box p="4">
                                <Box display="flex" alignItems="baseline" px={{ base: 10, md: 290 }}>
                                    <Box color="" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" display="flex" verticalAlign={"AiOutlineLike"}>
                                        <Icon as={AiOutlineLike} fontSize="md" />
                                        {e1.likes} liked
                                    </Box>
                                    <Spacer />
                                    <Link to={`/restaurant/detail/${numres}`}>
                                        <Box
                                            as="button"
                                            bg={""}
                                            fontWeight="semibold"
                                            letterSpacing="wide"
                                            fontSize="xs"
                                            textTransform="uppercase"
                                            px={2}
                                            py={1}
                                            display="flex" verticalAlign={"AiOutlineComment"}
                                        >
                                            <Icon as={AiOutlineComment} fontSize="md" />
                                            REVIEW
                                        </Box>
                                    </Link>
                                </Box>
                                {e1.reviews.map((e2: any) => {
                                    return (
                                        <ReviewContent name={e2.reviewBy?.fName} picture={e2.reviewsBy?.image} rate={e2?.rating} review={e2?.text} />
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
