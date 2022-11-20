import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Container, Flex, Heading, Link, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import ReviewDetail from "src/components/shopreview/ReviewDetail"
import Myreview from "src/components/shopreview/Myreview"
import AppBody from "../../components/share/app/AppBody"
import { useNavigate } from "react-router-dom"

const myreview = () => {
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
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
            </SimpleGrid>
            <Container my={5} textAlign={"center"}>
                That's all~
            </Container>
        </AppBody>
    )
}

export default myreview
