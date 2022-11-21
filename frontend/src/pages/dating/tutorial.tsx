import { Box, Button, Center, Container, Text, useBreakpointValue } from '@chakra-ui/react'
import DatingAppBody from 'src/components/dating/DatingAppBody'
import DatingCreatePollButton from 'src/components/dating/DatingCreatePollButton'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from 'react'

const FirstPageNextButton = (props: any) => {
    const swiper = useSwiper();
    return (<Button colorScheme="orange" w={{ base: "132px", md: "178px" }} h={{ base: "54px", md: "61px" }} boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)" onClick={() => swiper.slideNext()}>{props.children}</Button>);
}

const Tutorial = () => {
    
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    const dotColor = {
        "--swiper-pagination-color": "black",
    }

    return (
        <DatingAppBody>
            <Box>
                <Swiper id="tutorial" pagination={true} modules={[Pagination, Navigation]} className="mySwiper">
                    <SwiperSlide>
                        <Center>
                            <Box>
                                <Text textAlign="center" fontWeight="700"
                                    fontSize={{ base: "30px", md: "36px" }}
                                    lineHeight="133%" color="black" pt={{ base: "39.5px", md: "33px" }} >Hello!</Text>
                                {
                                    isMobile ?
                                        (<Text textAlign="center" fontWeight="700"
                                            fontSize="36px"
                                            lineHeight="133%" color="orange.600" pt="33px" >Firstname Lastname</Text>) :
                                        (<><Text textAlign="center" fontWeight="700"
                                            fontSize="30px"
                                            lineHeight="133%" color="orange.600" pt="39.5px">Firstname</Text>
                                            <Text textAlign="center" fontWeight="700"
                                                fontSize="30px"
                                                lineHeight="133%" color="orange.600" >Lastname</Text></>)
                                }
                                {
                                    isMobile ?
                                        (<><Text textAlign="center" fontWeight="700"
                                            fontSize="36px"
                                            lineHeight="133%" color="black" pt="33px" >Welcome to</Text>
                                            <Text textAlign="center" fontWeight="700"
                                                fontSize="36px"
                                                lineHeight="133%" color="black" >Dating & Finding Friend</Text></>) :
                                        (<><Text textAlign="center" fontWeight="700"
                                            fontSize="30px"
                                            lineHeight="133%" color="black" pt="39.5px">Welcome to</Text>
                                            <Text textAlign="center" fontWeight="700"
                                                fontSize="30px"
                                                lineHeight="133%" color="black" >Dating</Text>
                                            <Text textAlign="center" fontWeight="700"
                                                fontSize="30px"
                                                lineHeight="133%" color="black" >&</Text>
                                            <Text textAlign="center" fontWeight="700"
                                                fontSize="30px"
                                                lineHeight="133%" color="black" >Finding Friend</Text></>)
                                }
                                <Box display="flex" justifyContent="center" pt={{ base: "32px", md: "80px" }} pb={{ base: "178px", md: "80px" }}>
                                    <FirstPageNextButton><Text fontWeight="700"
                                        fontSize={{ base: "20px", md: "25px" }}
                                        lineHeight="120%" color="white"></Text>Next</FirstPageNextButton>
                                </Box>
                            </Box>
                        </Center>
                    </SwiperSlide>


                    <SwiperSlide>
                        <Box display="flex" h={{ base: "708px", md: "70vh" }}>
                            <Text>Slide 2</Text>
                        </Box>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </DatingAppBody >
    )
}

export default Tutorial