import { Box, Text, Flex, Stack, HStack, Icon, VStack, Button } from "@chakra-ui/react"
import { Pagination, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import AppBody from "../../../components/share/app/AppBody"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { MdPhoneIphone, MdDesktopWindows, MdTabletMac } from "react-icons/md"
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
                    <Card title="1" detail="Total Devices" />
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
                    <SwiperSlide>
                        <Box bg={"gray.400"} borderRadius={"lg"} h={"100%"}>
                            <Flex alignItems="center" justifyContent={"center"}>
                                <VStack alignItems="center" justifyContent={"center"} m={"6"}>
                                    <Text color={"white"} fontSize={"2xl"}>
                                        Device 1
                                    </Text>
                                    <Box bg={"white"} borderRadius={"full"} w={"100%"} h={"lg"} maxH={"155"}>
                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                            <Icon as={MdPhoneIphone} w="50%" h="155" justifySelf={"center"} alignSelf={"center"} />
                                        </Flex>
                                    </Box>
                                    <Text color={"white"}>Time: 20:23:56</Text>
                                    <Button bg={"gray.700"} color={"white"} w={"100%"} _hover={{ color: "black", bg: "gray.500" }}>
                                        Revoke
                                    </Button>
                                </VStack>
                            </Flex>
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box bg={"gray.400"} borderRadius={"lg"} h={"100%"} w={"100%"}>
                            <Flex alignItems="center" justifyContent={"center"}>
                                <VStack alignItems="center" justifyContent={"center"} m={"6"}>
                                    <Text color={"white"} fontSize={"2xl"}>
                                        Device 1
                                    </Text>
                                    <Box bg={"white"} borderRadius={"full"} w={"100%"} h={"lg"} maxH={"155"}>
                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                            <Icon as={MdDesktopWindows} w="50%" h="155" justifySelf={"center"} alignSelf={"center"} />
                                        </Flex>
                                    </Box>
                                    <Text color={"white"}>Time: 20:23:56</Text>
                                    <Button bg={"gray.700"} color={"white"} w={"100%"} _hover={{ color: "black", bg: "gray.500" }}>
                                        Revoke
                                    </Button>
                                </VStack>
                            </Flex>
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card icon={<AiOutlineDesktop />} title="test" detail="detail test" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card title="test2" detail="detail test" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card title="test3" detail="detail test" />
                    </SwiperSlide>
                </Swiper>
            </Box>
        </AppBody>
    )
}

export default index
