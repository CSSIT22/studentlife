import { Box, Text, Flex, Stack, HStack, Icon, VStack, Button } from "@chakra-ui/react"
import { Pagination, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import AppBody from "../../../components/share/app/AppBody"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { MdPhoneIphone, MdDesktopWindows, MdTabletMac } from "react-icons/md"
import api from "../../../function/API"
import { useContext, useEffect, useState } from "react"
import { authContext } from "src/context/AuthContext"

const Card = (props: any) => {
    return (
        <Box bg="white" p={4} width={"100%"} borderRadius="lg">
            <Box>{props.icon}</Box>
            <Box>
                <Text fontSize={"3xl"}>{props.title}</Text>
            </Box>
            <Box>
                <Text as={"b"} fontSize={"xl"}>
                    {props.detail}
                </Text>
            </Box>
        </Box>
    )
}

const index = () => {
    const user = useContext(authContext)
    const [tokens, setTokens] = useState<any[]>([])
    async function getTokensInfo() {
        const getTokens = await api.get("/backendservice/tokens")
        setTokens([...tokens, ...getTokens.data.tokens])
    }
    useEffect(() => {
        getTokensInfo()
    }, [])

    console.log(tokens)

    return (
        <AppBody>
            <Box bg="tomato" w="100%" p={4} color="white">
                <Flex justify={"end"}>
                    <Stack>
                        <Text as={"b"} fontSize="3xl">
                            Welcome! {user?.fName} {user?.lName}
                        </Text>
                        <Text alignSelf={"end"} fontSize="xl">
                            {new Date().toISOString().substring(0, 10)}
                        </Text>
                    </Stack>
                </Flex>
            </Box>
            <Box bg="lightblue" w="100%" p={4} color="black">
                <Text as={"b"} fontSize="3xl">
                    Device Statistics
                </Text>
                <HStack p={4} justify={"space-between"}>
                    <Card title="1" detail="Online Devices" />
                    <Card title="1" detail="Offline Devices" />
                    <Card title={tokens.length} detail="Total Devices" />
                </HStack>
            </Box>
            <Box bg="lightgreen" p={4}>
                <Text as={"b"} fontSize="3xl">
                    Overview
                </Text>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    // slidesPerGroup={1}
                    loop={false}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    width={750}
                >
                </Swiper>
            </Box>
        </AppBody>
    )
}

export default index
