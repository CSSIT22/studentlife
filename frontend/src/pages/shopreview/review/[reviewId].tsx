import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Center, Container, Flex, Heading, Link, SimpleGrid, useBreakpointValue, useMediaQuery } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import CommentBar from "src/components/shopreview/CommentBar"
import CommentReview from "src/components/shopreview/CommentReview"
import Comments from "src/components/shopreview/Comments"
import Myreview from "src/components/shopreview/Myreview"
import ReviewCards from "src/components/shopreview/ReviewCards"
import API from "src/function/API"

const review = () => {
    window.scrollTo(0, 0)
    let param = useParams()
    const [detail, setDetail] = useState<any>([])
    useEffect(() => {
        API.get(`/shopreview/getreview/${param.reviewId}`)
            .then((res) => setDetail(res.data))
    }, [param])
    const [com, setCom] = useState<any>([])
    useEffect(() => {
        API.get(`/shopreview/getcommentDb/${param.reviewId}`)
            .then((res) => setCom(res.data))
    }, [param])
    const navigate = useNavigate()
    function Navigate(target: any) {
        navigate("/shopreview")
        window.scrollTo(0, 0)
    }
    return (
        <AppBody>
            <Flex mb={5} alignItems={"center"}>
                <Link onClick={Navigate}>
                    <ChevronLeftIcon w={8} h={8} />
                </Link>
                <Heading color={"black"}>Review</Heading>
            </Flex>
            {detail.map((item: any) => {
                return (
                    <ReviewCards image={item.files} name={item.reviewer.fName + " " + item.reviewer.lName} ment={item.text} date={String(item.reviewedAt).substring(0, 10)} amo_rate={item.rating} amo_like={item.likeReceived} />
                )
            })}
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                {com.map((item: any) => {
                    return (
                        <CommentReview
                            image={""}
                            name={item.commentBy.fName + " " + item.commentBy.lName}
                            ment={item.text}
                            date={String(item.commentedAt).substring(0, 10)}
                        />
                    )
                })}
            </SimpleGrid>
            <Container mt={5} mb={20} textAlign={"center"}>
                That's all~
            </Container>
            <CommentBar />
        </AppBody>
    )
}

export default review
