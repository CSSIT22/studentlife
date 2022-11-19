import { Box, Text, Flex, Stack, HStack, Icon, VStack, Button, useDisclosure, Show, Hide } from "@chakra-ui/react"
import { Pagination, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import AppBody from "../../../components/share/app/AppBody"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { MdPhoneIphone, MdDesktopWindows, MdTabletMac } from "react-icons/md"
import api from "../../../function/API"
import { FC, ReactNode, useContext, useEffect, useState } from "react"
import { authContext } from "src/context/AuthContext"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, extendTheme } from "@chakra-ui/react"

const Card = (props: any) => {
    return (
        <Box bg="white" p={4} width={"100%"} borderRadius="lg" boxShadow="lg" border="1px" borderColor="gray.300">
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

const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
}

const theme = extendTheme({ breakpoints })

const index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useContext(authContext)
    const [tokens, setTokens] = useState<any[]>([])

    async function handleRevoke(token: string) {
        const res = await api.delete("/backendservice/revokeTokens", {
            data: {
                token: token,
                userId: tokens[0].userId,
            },
        })
        if (res.data.isLogoutCurrentDevice) {
            await api.get("auth/logout")
            location.reload()
        } else setTokens([...tokens.filter((item) => item.token !== res.data.token)])
        console.log(res)
    }

    async function getTokensInfo() {
        const getTokens = await api.get("/backendservice/tokens")
        setTokens([...tokens, ...getTokens.data.tokens])
    }

    useEffect(() => {
        getTokensInfo()
    }, [])

    const CustomModal: FC<{ modalHeader: string; modalBody: ReactNode; token: string }> = ({ modalHeader, modalBody, token }) => {
        return (
            <>
                <Button onClick={onOpen} bg={"gray.700"} color={"white"} w={"100%"} _hover={{ color: "black", bg: "gray.500" }}>
                    Revoke
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{modalHeader}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>{modalBody}</p>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme={"red"} variant={"solid"} color={"white"} backgroundColor={"red.400"} mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    handleRevoke(token)
                                    onClose()
                                }}
                                colorScheme={"green"}
                                variant={"solid"}
                                color={"white"}
                                backgroundColor={"green.400"}
                            >
                                Confirm
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

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
                                {new Date().toISOString().substring(0, 10)}
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
                    <Card title="1" detail="Online Devices" />
                    <Card title="1" detail="Offline Devices" />
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
                        breakpoints={{
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
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation]}
                        // className="mySwiper"
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
                                                <Box bg={"white"} borderRadius={"full"} w={["100%", "100%", "100%", "100%"]} h={"100%"}>
                                                    {item.detail.deviceInfo === "desktop" && (
                                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                                            <Icon as={MdDesktopWindows} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
                                                        </Flex>
                                                    )}
                                                    {item.detail.deviceInfo === "tablet" && (
                                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                                            <Icon as={MdTabletMac} w="50%" h="155" justifySelf={"center"} alignSelf={"center"} />
                                                        </Flex>
                                                    )}
                                                    {item.detail.deviceInfo === "mobile" && (
                                                        <Flex alignItems={"center"} justifyContent={"center"}>
                                                            <Icon as={MdPhoneIphone} w="50%" h="155" justifySelf={"center"} alignSelf={"center"} />
                                                        </Flex>
                                                    )}
                                                </Box>
                                                <Text color={"white"}>Login Date: {item.detail.loginDate.substring(0, 10)}</Text>
                                                <Text color={"white"}>Expired: {item.detail.tokenExpired.substring(0, 10)}</Text>
                                                {/* Insert CustomModal here */}
                                                <CustomModal
                                                    modalBody={
                                                        item.currentDevice ? (
                                                            <p>
                                                                This is your <b>current device</b>.
                                                            </p>
                                                        ) : (
                                                            <p>This will logout you out from selected device.</p>
                                                        )
                                                    }
                                                    modalHeader="Are you sure?"
                                                    token={item.token}
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
