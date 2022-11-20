import { Heading, Text, Box, Button, Center, useBreakpointValue, Stack } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper"
import { Image } from "@chakra-ui/react"

const Tutotial = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    const swiper = useSwiper()
    return (
        <DatingAppBody>
            {isMobile ? (
                <Box>
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Stack spacing={3} color="black">
                                <Center pt="3em">
                                    <Text fontSize="3xl" as="b">
                                        Hello!
                                    </Text>
                                </Center>
                                <Center pt="2em">
                                    <Text fontSize="3xl" as="b" color="#E65300">
                                        Firstname Lastname
                                    </Text>
                                </Center>
                                <Center pt="2em">
                                    <Text fontSize="3xl" as="b">
                                        Welcome to
                                    </Text>
                                </Center>
                                <Center pt="2em">
                                    <Text fontSize="3xl" as="b">
                                        Dating & Finding Friend
                                    </Text>
                                </Center>
                            </Stack>
                            <Center pt="3em">
                                {" "}
                                {/*ต้องกดแล้วไปหน้าต่อไป;-;*/}
                                <Stack spacing={4} direction="row" align="center">
                                    <Button colorScheme="orange" size="lg" onClick={() => swiper.slideNext()}>
                                        Next
                                    </Button>
                                </Stack>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Randomization</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Heart Checking</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>You Are Match With</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Activity Poll</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Tag of Interest</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Dating Option</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Tutorial</Heading>
                            </Center>
                            <Center pt="3em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                            <Center pt="3em">
                                {" "}
                                {/*ต้องกดแล้วต้องไปหน้าrandomization;-;*/}
                                <Stack spacing={4} direction="row" align="center">
                                    <Button colorScheme="orange" size="lg" onClick={() => swiper.slideNext()}>
                                        Start Using Dating & Finding Friend
                                    </Button>
                                </Stack>
                            </Center>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            ) : (
                <Box>
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <Stack spacing={3} color="black">
                                <Center pt="3em">
                                    <Text fontSize="3xl" as="b">
                                        Hello!
                                    </Text>
                                </Center>
                                <Center pt="2em">
                                    <Text fontSize="3xl" as="b" color="#E65300">
                                        Firstname Lastname
                                    </Text>
                                </Center>
                                <Center pt="2em">
                                    <Text fontSize="3xl" as="b">
                                        Welcome to
                                    </Text>
                                </Center>
                                <Center pt="2em">
                                    <Text fontSize="3xl" as="b">
                                        Dating & Finding Friend
                                    </Text>
                                </Center>
                            </Stack>
                            <Center pt="3em">
                                {" "}
                                {/*ต้องกดแล้วไปหน้าต่อไป;-;*/}
                                <Stack spacing={4} direction="row" align="center">
                                    <Button colorScheme="orange" size="lg" onClick={() => swiper.slideNext()}>
                                        Next
                                    </Button>
                                </Stack>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Randomization</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Heart Checking</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>You Are Match With</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Activity Poll</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Tag of Interest</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Dating Option</Heading>
                            </Center>
                            <Center pt="3em" pb="8em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Center pt="2em">
                                <Heading>Tutorial</Heading>
                            </Center>
                            <Center pt="3em" display="flex">
                                <Image src="https://i.gifer.com/7urF.gif"></Image>
                            </Center>
                            <Center pt="3em">
                                {" "}
                                {/*ต้องกดแล้วต้องไปหน้าrandomization;-;*/}
                                <Stack spacing={4} direction="row" align="center">
                                    <Button colorScheme="orange" size="lg" onClick={() => swiper.slideNext()}>
                                        Start Using Dating & Finding Friend
                                    </Button>
                                </Stack>
                            </Center>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            )}
        </DatingAppBody>
    )
}

export default Tutotial
