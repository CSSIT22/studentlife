import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Button, Container, Flex, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import ReviewDetail from "src/components/shopreview/ReviewDetail"
import Myreview from "src/components/shopreview/Myreview"
import AppBody from "../../components/share/app/AppBody"
import { useNavigate } from "react-router-dom"
import { authContext } from "src/context/AuthContext"
import API from "src/function/API"
import Comments from "src/components/shopreview/Comments"

const myreview = () => {
    const [myReviews, setMyReview] = useState<any>([])
    const getMyReview = API.get("/shopreview/getmyreviewDb")
    useEffect(() => {
        getMyReview.then((res) => {
            setMyReview(res.data)
        })  
    }, [])
    const [myReviews2, setMyReview2] = useState<any>([])
    const getMyReview2 = API.get("/shopreview/getmyreviewDb2")
    useEffect(() => {
        getMyReview2.then((res) => {
            setMyReview2(res.data)
        })
    }, [])
    const [myComments, setMyComment] = useState<any>([])
    const getMyComment = API.get("/shopreview/getmycommentDb")
    useEffect(() => {
        getMyComment.then((res) => {
            setMyComment(res.data)
        })
    }, [])

    const user = useContext(authContext)
    const navigate = useNavigate()
    const navigateHome = () => {
        navigate("/shopreview")
    }

    return (
        <AppBody>
            <Flex mb={5} direction={"row"} alignItems={"center"}>
                <Box as="button" onClick={navigateHome} mr={2}>
                    <ChevronLeftIcon w={8} h={8} />
                </Box>
                <Heading color={"black"}>My Review</Heading>
            </Flex>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                {myReviews.map((item: any) => {
                    if (item.userId === user?.userId) {
                        return (
                            <Myreview
                                image={
                                    "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                                }
                                name={String(user?.fName) + " " + String(user?.lName)}
                                ment={item.text}
                                date={item.reviewedAt}
                                am_like={item.likeReceived}
                                ratting={item.rating}
                            />
                        )
                    }
                })}
                {myReviews2.map((item: any) => {
                    if (item.userId === user?.userId) {
                        return (
                            <Myreview
                                image={
                                    "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                                }
                                name={String(user?.fName) + " " + String(user?.lName)}
                                ment={item.text}
                                date={item.reviewedAt}
                                am_like={item.likeReceived}
                                ratting={item.rating}
                            />
                        )
                    }
                })}
                
                <Container mt={5} textAlign={"center"}>
                    That's all for your review~
                </Container><br />
                <Heading mt={5} mb={3} ml={10} color={"black"} textAlign={"start"}>My Comment</Heading>
                {myComments.map((item: any) => {
                    if (item.userId === user?.userId) {
                        return (
                            <Comments image={""} name={String(user?.fName) + " " + String(user?.lName)} ment={item.text} date={item.commentedAt} />
                        )
                    }
                })}
            </SimpleGrid>
            <Container my={5} textAlign={"center"}>
                That's all for your comment~
            </Container>
        </AppBody>
    )
}

export default myreview
