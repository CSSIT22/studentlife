import { Heading, Text, Box, Button, Center, useBreakpointValue, Stack } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

const YouLiked = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    const swiper = useSwiper()
    return ( 
    <DatingAppBody>
        {isMobile ?(
            <Box>
                People who you liked

            </Box>
        ) : (
            <Box>

            </Box>
        )}
        </DatingAppBody>
)
}

export default YouLiked
