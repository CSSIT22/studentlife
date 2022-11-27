import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Center, Container, Flex, Heading, Link, SimpleGrid, useBreakpointValue, useMediaQuery } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import CommentBar from "src/components/shopreview/CommentBar"
import CommentReview from "src/components/shopreview/CommentReview"
import Comments from "src/components/shopreview/Comments"
import Myreview from "src/components/shopreview/Myreview"
import ReviewCards from "src/components/shopreview/ReviewCards"

const review = () => {
    return (
        <AppBody>
            <Flex mb={5} alignItems={"center"}>
                <Link href="javascript:javascript:history.go(-1)">
                    <ChevronLeftIcon w={8} h={8} />
                </Link>
                <Heading color={"black"}>Review</Heading>
            </Flex>
            <ReviewCards />
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                <CommentReview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joe"}
                    ment={"Love You ♥"}
                    date={"Nov 19 22"}
                />
                <CommentReview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Boom"}
                    ment={"+1"}
                    date={"Nov 19 22"}
                />
                <CommentReview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Fam"}
                    ment={"+2"}
                    date={"Nov 19 22"}
                />
                <CommentReview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"JibLek"}
                    ment={"Mai Kub"}
                    date={"Nov 19 22"}
                />
            </SimpleGrid>
            <Container mt={5} mb={20} textAlign={"center"}>
                That's all~
            </Container>
            <CommentBar />
        </AppBody>
    )
}

export default review
