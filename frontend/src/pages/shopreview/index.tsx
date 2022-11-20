import { Box, Button, Container, Flex, Heading, Link, Text, SimpleGrid, VStack, Collapse, TabList, Tab, WrapItem, Center } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import Myreview from "src/components/shopreview/Myreview"
import Rate from "src/components/shopreview/Rate"
import SelectZone from "src/components/shopreview/SelectZone"
import Zone from "src/components/shopreview/Zone"
import AppBody from "../../components/share/app/AppBody"
import SecondaryNav from "../../components/share/navbar/SecondaryNav"
import DetailBox from "../../components/shopreview/DetailBox"
import Header from "../../components/shopreview/Header"
import ReviewDetail from "../../components/shopreview/ReviewDetail"
import ShopName from "../../components/shopreview/ShopName"

const shopreview = () => {
    // const [userRoom, setuserRoom] = useState<room>(mockRoom)
    const [target, setTarget] = useState(1)
    const navigateShop = useNavigate()
    //function handle
    function Navigate(target: any) {
        return navigate(`/shopreview/shopdetails/${target}`)
    }

    const renderShop = (e: any) => {
        if (target === 1) {
            return (
                <>
                    <SimpleGrid columns={{ base: 2, lg: 3 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                        <DetailBox heading="ร้าน 1" image="https://cf.shopee.co.th/file/354b570e0bbc41553d97b1bf0489dcdf" />
                        <DetailBox heading="ร้าน 2" image="https://cf.shopee.co.th/file/354b570e0bbc41553d97b1bf0489dcdf" />
                        <DetailBox heading="ร้าน 3" image="https://cf.shopee.co.th/file/354b570e0bbc41553d97b1bf0489dcdf" />
                        <DetailBox heading="ร้าน 4" image="https://cf.shopee.co.th/file/354b570e0bbc41553d97b1bf0489dcdf" />
                    </SimpleGrid>
                    <Container my={5} textAlign={"center"}>
                        That's all~
                    </Container>
                </>
            )
        }
        if (target === 2) {
            return (
                <>
                    <SimpleGrid columns={{ base: 2, lg: 3 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                        <DetailBox
                            heading="ข้าวมันไก่ป้าตุ๊ก"
                            image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                        />
                        <DetailBox
                            heading="ข้าวมันไก่ป้าตุ๊กต๊ากต๊อกเต๊ก"
                            image="https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg"
                        />
                        <DetailBox
                            heading="ร้านนี่ไม่มีขื่อ"
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
                    <Container my={5} textAlign={"center"}>
                        That's all~
                    </Container>
                </>
            )
        }
    }

    const Tests: FC<{
        name: String
    }> = ({ name }) => {
        const [active, setActive] = useState(false)
        const handleClick = () => {
            setActive(!active)
        }
        return (
            <Button
                onClick={handleClick}
                style={{ background: active ? "#FF7E20" : "#FF7E20", color: active ? "white" : "white" }}
                mr={2}
                ml={2}
                transitionDuration="300ms"
                width={"100px"}
                rounded={"3xl"}
            >
                {name}
            </Button>
        )
    }
    const [zones, setZones] = useState<string[]>([])
    function handleSetZones(zone: any) {
        if (!zones.includes(zone)) {
            setZones([...zones, zone])
        } else {
            const newArr = zones.filter((value) => value !== zone)
            setZones(newArr)
        }
    }

    const navigate = useNavigate()
    const navigateMyreview = () => {
        navigate("/shopreview/myreview")
    }
    return (
        <AppBody>
            <Flex mb={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Heading color={"black"}>Shop Review</Heading>
                <Link onClick={navigateMyreview}>
                    {/* <Button width={"150px"} colorScheme="gray" rounded={"3xl"}> */}
                    <Text as={"b"} color={"#FF7E20"}>
                        <Text as={"u"}>My Review</Text>
                    </Text>
                    {/* </Button> */}
                </Link>
            </Flex>
            <Flex mb={3}>
                <Button
                    fontSize={"lg"}
                    backgroundColor={target === 1 ? "#FF7E20" : ""}
                    color={target === 1 ? "white" : ""}
                    _hover={{ background: "#FF7E20" }}
                    transitionDuration="300ms"
                    onClick={() => setTarget(1)}
                    mr={4}
                    width={"200px"}
                    rounded={"3xl"}
                >
                    Shop
                </Button>
                <Button
                    fontSize={"lg"}
                    backgroundColor={target === 2 ? "#FF7E20" : ""}
                    color={target === 2 ? "white" : ""}
                    _hover={{ background: "#FF7E20" }}
                    transitionDuration="300ms"
                    onClick={() => setTarget(2)}
                    width={"200px"}
                    rounded={"3xl"}
                >
                    Restaurant
                </Button>
            </Flex>
            <Flex mb={5}>
                <Zone name={"+zone"} handleSetZones={handleSetZones} />
                {zones.map((item, index) => {
                    // return <SelectZone key={index} handleSetZones={handleSetZones} name={item} />
                    return <Tests key={index} name={item} />
                })}
                {/* <SelectZone handleSetZones={handleSetZones} name={"หอหญิง"} /> */}
            </Flex>
            <Heading color={"black"} size={"lg"}>
                Recommended
            </Heading>
            {renderShop(target)}
        </AppBody>
    )
}

export default shopreview
