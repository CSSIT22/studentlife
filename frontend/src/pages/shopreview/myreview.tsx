import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Button, Container, Flex, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import ReviewDetail from "src/components/shopreview/ReviewDetail"
import Myreview from "src/components/shopreview/Myreview"
import AppBody from "../../components/share/app/AppBody"
import { useNavigate } from "react-router-dom"
import { authContext } from "src/context/AuthContext"
import API from "src/function/API"

const myreview = () => {
    const [myReviews, setMyReview] = useState<any>([])
    const getMyReview = API.get("/shopreview/getmyreview")
    useEffect(() => {
        getMyReview.then((res) => {
            setMyReview(res.data)
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
                                date={item.reviewdAt}
                                am_like={item.likeReceived}
                                ratting={item.rating}
                            />
                        )
                    }
                    // else {
                    //     return <Text>Now you don't have any review.</Text>
                    // }
                })}
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={String(user?.fName) + " " + String(user?.lName)}
                    ment={"Love this so much!!!"}
                    date={"2577/12/27"}
                    am_like={"8"}
                    ratting={"5"}
                />
            </SimpleGrid>
            <Container my={5} textAlign={"center"}>
                That's all~
            </Container>
        </AppBody>
    )
}

export default myreview
