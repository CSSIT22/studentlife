import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Link,
    Text,
    SimpleGrid,
    VStack,
    Collapse,
    TabList,
    Tab,
    WrapItem,
    Center,
    Spacer,
} from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Myreview from "src/components/shopreview/Myreview"
import Rate from "src/components/shopreview/Rate"
import SelectZone from "src/components/shopreview/SelectZone"
import Zone from "src/components/shopreview/Zone"
import { authContext } from "src/context/AuthContext"
import API from "src/function/API"
import AppBody from "../../components/share/app/AppBody"
import SecondaryNav from "../../components/share/navbar/SecondaryNav"
import DetailBox from "../../components/shopreview/DetailBox"
import ReviewDetail from "../../components/shopreview/ReviewDetail"
import ShopName from "../../components/shopreview/ShopName"

const shopreview = () => {
    // const [userRoom, setuserRoom] = useState<room>(mockRoom)
    const [target, setTarget] = useState(1)

    const [shops, setshops] = useState<any>([])
    const [res, setRes] = useState<any>([])
    const getShop = API.get("/shopreview/getshop")
    useEffect(() => {
        getShop.then((res) => {
            setshops(res.data)
        })
    }, [])
    const getRestaurant = API.get("/shopreview/getrestaurant")
    useEffect(() => {
        getRestaurant.then((res) => {
            setRes(res.data)
        })
    }, [])

    const renderShop = (e: any) => {
        if (target === 1) {
            return (
                <>
                    <SimpleGrid columns={{ base: 2, lg: 3 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                        {shops.map((item: any) => {
                            if (zones.length === 0 && item.type === "shop") {
                                return (
                                    <DetailBox key={item.id} heading={item.name} image={item.image} rate={item.amo_rate} amo_re={item.amo_review} />
                                )
                            } else if (zones.includes(item.zone) && item.type === "shop") {
                                return (
                                    <DetailBox key={item.id} heading={item.name} image={item.image} rate={item.amo_rate} amo_re={item.amo_review} />
                                )
                            }
                        })}
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
                        {res.map((item: any) => {
                            if (zones.length === 0 && item.type === "restaurant") {
                                return (
                                    <DetailBox key={item.id} heading={item.name} image={item.image} rate={item.amo_rate} amo_re={item.amo_review} />
                                )
                            } else if (zones.includes(item.zone) && item.type === "restaurant") {
                                return (
                                    <DetailBox key={item.id} heading={item.name} image={item.image} rate={item.amo_rate} amo_re={item.amo_review} />
                                )
                            }
                        })}
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
                shadow={"lg"}
            >
                {name}
            </Button>
        )
    }
    const [count, setCount] = useState(1)
    const ZoneCount = () => {
        return <Tests name={"+" + count} />
    }

    const [zones, setZones] = useState<string[]>([])
    function handleSetZones(zone: any) {
        if (!zones.includes(zone)) {
            setZones([...zones, zone])
            if (zones.length > 2) {
                setCount(count + 1)
            } else if (count <= 0) {
                setCount(1)
            }
        } else {
            const newArr = zones.filter((value) => value !== zone)
            setZones(newArr)
            if (zones.length > 2) {
                setCount(count - 1)
            } else if (count <= 0) {
                setCount(1)
            }
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
                    shadow={"lg"}
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
                    shadow={"lg"}
                >
                    Restaurant
                </Button>
            </Flex>
            <Flex mb={5}>
                <Zone name={"+zone"} handleSetZones={handleSetZones} />
                {/* {zones.map((item, index) => {
                    // return <SelectZone key={index} handleSetZones={handleSetZones} name={item} />
                    return <Tests key={index} name={item} />
                })} */}
                {zones.length < 3 ? (
                    zones.map((item, index) => {
                        // return <SelectZone key={index} handleSetZones={handleSetZones} name={item} />
                        return <Tests key={index} name={item} />
                    })
                ) : (
                    <>
                        <Tests name={zones[0]} />
                        <Tests name={zones[1]} />
                        <ZoneCount />
                    </>
                )}
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
function userContext(authContext: any) {
    throw new Error("Function not implemented.")
}
