import { Box, Image, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import { Image1 } from "@apiType/restaurant"

const ShowImage: FC<{
    img: Array<Image1>
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
                {img.map((m) => {
                    return (
                        <SwiperSlide>
                            <Center>
                                <Image
                                    borderRadius="3xl"
                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${m.image}&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`}
                                    width={{ base: "17rem", sm: "24rem" }}
                                    height={{ base: "23rem", sm: "19rem" }}
                                ></Image>
                            </Center>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    )
}

export default ShowImage
