import { Box, Image, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"

const ShowImage: FC<{
    img: Array<string>
}> = ({ img }) => {
    return (
        <Box>
            <Swiper
                grabCursor={true}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                loop={true}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <Center>
                        <Image borderRadius="3xl" src={img[0]} width={"28rem"} height={"21rem"}></Image>
                    </Center>
                </SwiperSlide>
                <SwiperSlide>
                    <Center>
                        <Image borderRadius="3xl" src={img[1]} width={"28rem"} height={"21rem"}></Image>
                    </Center>
                </SwiperSlide>
                <SwiperSlide>
                    <Center>
                        <Image borderRadius="3xl" src={img[2]} width={"28rem"} height={"21rem"}></Image>
                    </Center>
                </SwiperSlide>
            </Swiper>
        </Box>
    )
}

export default ShowImage
