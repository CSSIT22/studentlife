import { Box, Button, Container, Flex, Heading, Link, Text, SimpleGrid, VStack, Collapse, TabList, Tab } from "@chakra-ui/react"
import Myreview from "src/components/shopreview/Myreview"
import Rate from "src/components/shopreview/Rate"
import Zone from "src/components/shopreview/Zone"
import AppBody from "../../components/share/app/AppBody"
import SecondaryNav from "../../components/share/navbar/SecondaryNav"
import DetailBox from "../../components/shopreview/DetailBox"
import Header from "../../components/shopreview/Header"
import ReviewDetail from "../../components/shopreview/ReviewDetail"
import ShopName from "../../components/shopreview/ShopName"

const shopreview = () => {
    return (
        <AppBody>
            <Flex mb={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Heading color={"black"}>Shop Review</Heading>
                <Link href="/shopreview/myreview">
                    {/* <Button width={"150px"} colorScheme="gray" rounded={"3xl"}> */}
                    <Text as={"b"} color={"#FF7E20"}>
                        <Text as={"u"}>My Review</Text>
                    </Text>
                    {/* </Button> */}
                </Link>
            </Flex>
            <Flex mb={3}>
                <Button mr={4} width={"200px"} colorScheme="orange" rounded={"3xl"}>
                    Shop
                </Button>
                <Button width={"200px"} colorScheme="gray" rounded={"3xl"}>
                    Restaurant
                </Button>
            </Flex>
            <Flex mb={5}>
                <Zone name="+zone" />
            </Flex>
            <Heading color={"black"} size={"lg"}>
                Recommended
            </Heading>
            <SimpleGrid columns={{ base: 2, lg: 3 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                <DetailBox
                    heading="ร้าน 1"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 2"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 3"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
                <DetailBox
                    heading="ร้าน 4"
                    image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                <ReviewDetail
                    image="https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    name={"Joe"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joe"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
            </SimpleGrid>
            <Rate />
            <Container my={5} textAlign={"center"}>
                That's all~
            </Container>
        </AppBody>
    )
}

export default shopreview
