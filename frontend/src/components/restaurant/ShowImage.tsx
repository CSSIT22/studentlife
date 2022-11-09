import { Box, Image, Center } from "@chakra-ui/react"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"

const ShowImage = () => {
    return (
        <Box>
            <Swiper grabCursor={true} navigation={true} modules={[Navigation, Pagination]} className="mySwiper" pagination={{ clickable: true }}>
                <SwiperSlide>
                    <Center>
                        <Image
                            borderRadius="3xl"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/800px-Tom%27s_Restaurant%2C_NYC.jpg?20170523012006"
                            width={"auto"}
                            height="400px"
                        ></Image>
                    </Center>
                </SwiperSlide>
                <SwiperSlide>
                    <Center>
                        <Image
                            borderRadius="3xl"
                            src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
                            width={"auto"}
                            height="400px"
                        ></Image>
                    </Center>
                </SwiperSlide>
                <SwiperSlide>
                    <Center>
                        <Image
                            borderRadius="3xl"
                            src="https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=2000"
                            width={"auto"}
                            height="400px"
                        ></Image>
                    </Center>
                </SwiperSlide>
                <SwiperSlide>
                    <Center>
                        <Image
                            borderRadius="3xl"
                            src="https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2148999934.jpg?w=2000"
                            width={"auto"}
                            height="400px"
                        ></Image>
                    </Center>
                </SwiperSlide>
                <SwiperSlide>
                    <Center>
                        <Image
                            borderRadius="3xl"
                            src="https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000"
                            width={"auto"}
                            height="400px"
                        ></Image>
                    </Center>
                </SwiperSlide>
            </Swiper>
        </Box>
    )
}

export default ShowImage
