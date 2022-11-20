import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Center, Flex, Heading, Link, SimpleGrid, useMediaQuery } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import CommentBar from "src/components/shopreview/CommentBar"
import Comments from "src/components/shopreview/Comments"
import ReviewCards from "src/components/shopreview/ReviewCards"

const review = () => {
    const navigate = useNavigate()
    const navigateHome = () => {
        navigate("/shopreview")
    }

    return (
        <AppBody>
            <Flex mb={5} alignItems={"center"}>
                <Link href="javascript:javascript:history.go(-1)">
                    <ChevronLeftIcon w={8} h={8} />
                </Link>
                <Heading>Review</Heading>
            </Flex>
            <SimpleGrid>
                <Center mb={5}>
                    {" "}
                    <ReviewCards />
                </Center>
                <Box>
                    <Box mb={3}>
                        {" "}
                        <Comments
                            image={
                                "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                            }
                            name={"J"}
                            ment={"Love"}
                            date={"Nov 19 22"}
                        />
                    </Box>
                    <Box mb={3}>
                        {" "}
                        <Comments
                            image={
                                "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                            }
                            name={"J"}
                            ment={"Love"}
                            date={"Nov 19 22"}
                        />
                    </Box>
                    <Box mb={3}>
                        {" "}
                        <Comments
                            image={
                                "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                            }
                            name={"J"}
                            ment={"Love"}
                            date={"Nov 19 22"}
                        />
                    </Box>
                    <Box mb={3}>
                        {" "}
                        <Comments
                            image={
                                "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                            }
                            name={"J"}
                            ment={"Love"}
                            date={"Nov 19 22"}
                        />
                    </Box>
                </Box>
                <Box mb={"2"}>
                    {" "}
                    <CommentBar />
                </Box>
            </SimpleGrid>
        </AppBody>
    )
}

export default review
