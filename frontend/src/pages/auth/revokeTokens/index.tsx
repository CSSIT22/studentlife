import { useContext, useEffect, useState } from "react"
import { MdPhoneIphone, MdDesktopWindows, MdTabletMac } from "react-icons/md"
import { Box, Text, Flex, Stack, Icon, VStack, Hide } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { authContext } from "src/context/AuthContext"
import Card from "../../../components/backendService/Card"
import CustomModal from "src/components/backendService/CustomModal"
import AppBody from "../../../components/share/app/AppBody"
import api from "../../../function/API"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const index = () => {
    const user = useContext(authContext)
    const [tokens, setTokens] = useState<any[]>([])
    const breakpoints = {
        1200: {
            slidesPerView: 3,
            spaceBetween: 20,
            navigation: true,
        },
        960: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        820: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        390: {
            slidesPerView: 1,
        },
    }
    let dateLogin = new Date()

    async function handleRevoke(token: string) {
        const res = await api.delete("/backendservice/revokeTokens", {
            data: {
                token: token,
                userId: tokens[0].userId,
            },
        })
        if (res.data.isLogoutCurrentDevice) {
            await api.get("auth/logout")
        } else setTokens([...tokens.filter((item) => item.token !== res.data.token)])
        console.log(res)
    }

    async function getTokensInfo() {
        const getTokens = await api.get("/backendservice/tokens")
        setTokens([...tokens, ...getTokens.data.tokens])
        dateLogin = tokens.filter((item) => item.currentDevice)[0].detail.loginDate
    }

    useEffect(() => {
        getTokensInfo()
    }, [])

    console.log(tokens)

    return (
        <AppBody>
            <Hide below="sm">
                <Box w="100%" p={4} color="black">
                    <Flex justify={"end"}>
                        <Stack>
                            <Text as={"b"} fontSize="3xl">
                                Welcome! {user?.fName} {user?.lName}
                            </Text>
                            <Text alignSelf={"end"} fontSize="xl">
                                {dateLogin.toISOString().substring(0, 10)}
                            </Text>
                        </Stack>
                    </Flex>
                </Box>
            </Hide>
            {/* <Hide below="sm"> */}
            <Box w="100%" p={4} color="black">
                <Text as={"b"} fontSize="3xl">
                    Device Statistics
                </Text>
                <Stack direction={["column", "row"]} p={4} justify={"space-between"}>
                    <Card title={tokens.length} detail="Total Devices" />
                </Stack>
            </Box>
            {/* </Hide> */}
            <Box p={4}>
                <Text as={"b"} fontSize="3xl" color="black">
                    Overview
                </Text>
                <Box pt={8} px={[0, 0, 50, 100]}>
                    <Swiper
                        breakpoints={breakpoints}
                        pagination={{ clickable: true, }}
                        modules={[Navigation]}
                    >
                        {tokens.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Box bg={"gray.400"} borderRadius={"lg"} w={"100%"} h={"100%"} boxShadow="lg" border="1px" borderColor="gray.300">
                                        <Flex alignItems="center" justifyContent={"center"}>
                                            <VStack alignItems="center" justifyContent={"center"} m={"6"}>
                                                <Text color={"white"} fontSize={"2xl"}>
                                                    Device {index + 1}
                                                </Text>
                                                <Box bg={"white"} borderRadius={"full"} w={"100%"} h={"100%"}>
                                                    {item.detail.deviceInfo === "desktop" && (
                                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                                            <Icon as={MdDesktopWindows} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
                                                        </Flex>
                                                    )}
                                                    {item.detail.deviceInfo === "tablet" && (
                                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                                            <Icon as={MdTabletMac} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
                                                        </Flex>
                                                    )}
                                                    {item.detail.deviceInfo === "smartphone" && (
                                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                                            <Icon as={MdPhoneIphone} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
                                                        </Flex>
                                                    )}
                                                </Box>
                                                <Text color={"white"}>Login Date: {item.detail.loginDate.substring(0, 10)}</Text>
                                                <Text color={"white"}>Expired: {item.detail.tokenExpired.substring(0, 10)}</Text>
                                                {/* Insert CustomModal here */}
                                                <CustomModal
                                                    onClick={handleRevoke}
                                                    modalHeader="Are you sure?"
                                                    token={item.token}
                                                    isCurrentDevice={item.currentDevice}
                                                />
                                            </VStack>
                                        </Flex>
                                    </Box>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Box>
            </Box>
        </AppBody>
    )
}

export default index
