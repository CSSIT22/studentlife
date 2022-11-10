import { Heading, Text, Box, Button, ButtonGroup, Center, useBreakpointValue, Stack } from "@chakra-ui/react"
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
            {isMobile ? (
                <Stack>
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%" py={12} mb={3}>
                        <ButtonGroup gap="4em">
                            <Button colorScheme="orange" height="58px" width="240px">
                                People that liked you
                            </Button>
                            <Button colorScheme="orange" height="58px" width="240px">
                                People that you liked
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Stack>
            ) : (
                <Box></Box>
            )}
        </DatingAppBody>
    )
}

export default YouLiked
