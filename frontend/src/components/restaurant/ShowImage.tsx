import { Box, Image, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import { Image1 } from "@apiType/restaurant"

const ShowImage: FC<{
    img: Array<Image1>
}> = ({ img }) => {
   console.log(img);
   
    if (img == undefined) {
        return(
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
                                <Image
                                    backgroundColor={"gray.200"}
                                    borderRadius="3xl"
                                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                                    width={{ base: "17rem", sm: "24rem" }}
                                    height={{ base: "23rem", sm: "19rem" }}
                                ></Image>
                            </Center>
                        </SwiperSlide>
             </Swiper>
        )
      
    } else {
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
    
                    {
                    img?.map((m) => {
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
   
}

export default ShowImage
