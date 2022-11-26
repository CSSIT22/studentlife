import { Box, Button, Center, Heading, Text, useBoolean, useBreakpointValue, useToast } from '@chakra-ui/react'
import DatingAppBody from 'src/components/dating/DatingAppBody'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Lottie from "lottie-react"
import DatingLoading from "../../components/dating/lottie/DatingLoading.json"
import { useEffect, useState } from 'react'
import API from 'src/function/API'
import { useNavigate } from 'react-router-dom'

const FirstPageNextButton = (props: any) => {
    const swiper = useSwiper();

    return (<Button className="swiper-no-swiping" colorScheme="orange" w={{ base: "132px", md: "178px" }} h={{ base: "54px", md: "61px" }} boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)" onClick={() => swiper.slideNext()}>{props.children}</Button>);
}

const LeftButton = (props: any) => {
    const swiper = useSwiper();
    return (<Button className="swiper-no-swiping" colorScheme="orange" w="80px" h="80px" borderRadius="full" boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)" onClick={() => swiper.slidePrev()}>{props.children}</Button>);
}

const RightButton = (props: any) => {
    const swiper = useSwiper();
    return (<Button className="swiper-no-swiping" colorScheme="orange" w="80px" h="80px" borderRadius="full" boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)" onClick={() => swiper.slideNext()}>{props.children}</Button>);
}

const Tutorial = () => {
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [isLoading, { off }] = useBoolean(true)
    const [isError, setIsError] = useState(false)
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {
        if (didMount) {
            API.get("/dating/tutorial/getUserProfile")
                .then((userProfile) => {
                    setFName(userProfile.data.fName)
                    setLName(userProfile.data.lName)
                })
                .catch((err) => setIsError(true))
                .finally(off)
        }
    })

    function checkOption() {
        API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
            API.get("/dating/verifyEnroll/getDatingOptions")
                .then((datingOptions) => {
                    if (!datingOptions.data.userId) {
                        navigate("/dating/option")
                    }
                    else if (!datingEnroll.data.hasCompleteSetting) {
                        navigate("/dating/interests")
                    }
                    else {
                        navigate("/dating/")
                    }
                })
        }
        )
    }

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }
    const [isSubmitted, { on }] = useBoolean(false)
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    function handleSubmit() {
        API.post("/dating/tutorial/setDatingEnroll")
            .then(() => checkOption())
            .catch((err) => { toast({ status: "error", position: "top", title: "Error", description: "Please login before submitting!" }), setIsError(true) })
    }

    return (
        <DatingAppBody>
            <Box>
                {isSubmitted || isLoading ? <Box display="block" mt={{ md: "-200px" }}>
                    <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.3" }} />
                    <Box display="flex" justifyContent="center">
                        <Text color="black" fontWeight="700" fontSize={{ base: "36px", md: "43px" }} lineHeight="120%" mt={{ base: "-130px", md: "-330px" }} >
                            LOADING...
                        </Text>
                    </Box>
                </Box> :
                    <Swiper id="tutorial" pagination={true} modules={[Pagination]} className="mySwiper">
                        <SwiperSlide>
                            <Center>
                                <Box>
                                    <Text textAlign="center" fontWeight="700"
                                        fontSize={{ base: "30px", md: "36px" }}
                                        lineHeight="133%" color="black" pt={{ base: "39.5px", md: "53px" }} >Hello!</Text>
                                    {
                                        isMobile ?
                                            (<Text textAlign="center" fontWeight="700"
                                                fontSize="36px"
                                                lineHeight="133%" color="orange.600" pt="33px" >{fName.charAt(0) + fName.substring(1).toLowerCase()}&nbsp;{lName.charAt(0) + lName.substring(1).toLowerCase()}</Text>) :
                                            (<><Text textAlign="center" fontWeight="700"
                                                fontSize="30px"
                                                lineHeight="133%" color="orange.600" pt="39.5px">{fName.charAt(0) + fName.substring(1).toLowerCase()}</Text>
                                                <Text textAlign="center" fontWeight="700"
                                                    fontSize="30px"
                                                    lineHeight="133%" color="orange.600" >{lName.charAt(0) + lName.substring(1).toLowerCase()}</Text></>)
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
                                    <Box display="flex" justifyContent="center" pt={{ base: "32px", md: "80px" }} pb="178px">
                                        <FirstPageNextButton>
                                            <Text fontWeight="700"
                                                fontSize={{ base: "20px", md: "25px" }}
                                                lineHeight="120%" color="white">Next</Text></FirstPageNextButton>
                                    </Box>
                                </Box>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            {isMobile ? (<><Box position="absolute" top={220} left={0}>
                                <LeftButton><BsArrowLeft color="white" fontSize="50px" /></LeftButton>
                            </Box>
                                <Box position="absolute" top={220} right={0}>
                                    <RightButton><BsArrowRight color="white" fontSize="50px" /></RightButton>
                                </Box></>) : (<></>)}

                            <Center>
                                <Box>
                                    <Text textAlign="center" color="black" fontWeight="700"
                                        fontSize="36px"
                                        lineHeight="120%" pt={{ base: "10px", md: "36px" }}>Discovery</Text>
                                    {isMobile ? <Box
                                        borderRadius="10px"
                                        mt="26px"
                                        w="552px"
                                        h="354px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
                                    /> : <Box
                                        borderRadius="10px"
                                        mt="36px"
                                        w="294px"
                                        h="426px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.tenor.com/l9d2q8-JiQoAAAAM/kermit.gif"
                                    />
                                    }

                                </Box>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            {isMobile ? (<><Box position="absolute" top={220} left={0}>
                                <LeftButton><BsArrowLeft color="white" fontSize="50px" /></LeftButton>
                            </Box>
                                <Box position="absolute" top={220} right={0}>
                                    <RightButton><BsArrowRight color="white" fontSize="50px" /></RightButton>
                                </Box></>) : (<></>)}

                            <Center>
                                <Box>
                                    <Text textAlign="center" color="black" fontWeight="700"
                                        fontSize="36px"
                                        lineHeight="120%" pt={{ base: "10px", md: "36px" }}>History</Text>
                                    {isMobile ? <Box
                                        borderRadius="10px"
                                        mt="26px"
                                        w="552px"
                                        h="354px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
                                    /> : <Box
                                        borderRadius="10px"
                                        mt="36px"
                                        w="294px"
                                        h="426px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.tenor.com/l9d2q8-JiQoAAAAM/kermit.gif"
                                    />
                                    }

                                </Box>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            {isMobile ? (<><Box position="absolute" top={220} left={0}>
                                <LeftButton><BsArrowLeft color="white" fontSize="50px" /></LeftButton>
                            </Box>
                                <Box position="absolute" top={220} right={0}>
                                    <RightButton><BsArrowRight color="white" fontSize="50px" /></RightButton>
                                </Box></>) : (<></>)}

                            <Center>
                                <Box>
                                    <Text textAlign="center" color="black" fontWeight="700"
                                        fontSize="36px"
                                        lineHeight="120%" pt={{ base: "10px", md: "36px" }}>Matches</Text>
                                    {isMobile ? <Box
                                        borderRadius="10px"
                                        mt="26px"
                                        w="552px"
                                        h="354px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
                                    /> : <Box
                                        borderRadius="10px"
                                        mt="36px"
                                        w="294px"
                                        h="426px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.tenor.com/l9d2q8-JiQoAAAAM/kermit.gif"
                                    />
                                    }

                                </Box>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            {isMobile ? (<><Box position="absolute" top={220} left={0}>
                                <LeftButton><BsArrowLeft color="white" fontSize="50px" /></LeftButton>
                            </Box>
                                <Box position="absolute" top={220} right={0}>
                                    <RightButton><BsArrowRight color="white" fontSize="50px" /></RightButton>
                                </Box></>) : (<></>)}

                            <Center>
                                <Box>
                                    <Text textAlign="center" color="black" fontWeight="700"
                                        fontSize="36px"
                                        lineHeight="120%" pt={{ base: "10px", md: "36px" }}>Activity polls</Text>
                                    {isMobile ? <Box
                                        borderRadius="10px"
                                        mt="26px"
                                        w="552px"
                                        h="354px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
                                    /> : <Box
                                        borderRadius="10px"
                                        mt="36px"
                                        w="294px"
                                        h="426px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.tenor.com/l9d2q8-JiQoAAAAM/kermit.gif"
                                    />
                                    }

                                </Box>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            {isMobile ? (<><Box position="absolute" top={220} left={0}>
                                <LeftButton><BsArrowLeft color="white" fontSize="50px" /></LeftButton>
                            </Box>
                                <Box position="absolute" top={220} right={0}>
                                    <RightButton><BsArrowRight color="white" fontSize="50px" /></RightButton>
                                </Box></>) : (<></>)}

                            <Center>
                                <Box>
                                    <Text textAlign="center" color="black" fontWeight="700"
                                        fontSize="36px"
                                        lineHeight="120%" pt={{ base: "10px", md: "36px" }}>Interests</Text>
                                    {isMobile ? <Box
                                        borderRadius="10px"
                                        mt="26px"
                                        w="552px"
                                        h="354px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
                                    /> : <Box
                                        borderRadius="10px"
                                        mt="36px"
                                        w="294px"
                                        h="426px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.tenor.com/l9d2q8-JiQoAAAAM/kermit.gif"
                                    />
                                    }

                                </Box>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            {isMobile ? (<><Box position="absolute" top={220} left={0}>
                                <LeftButton><BsArrowLeft color="white" fontSize="50px" /></LeftButton>
                            </Box>
                                <Box position="absolute" top={220} right={0}>
                                    <RightButton><BsArrowRight color="white" fontSize="50px" /></RightButton>
                                </Box></>) : (<></>)}

                            <Center>
                                <Box>
                                    <Text textAlign="center" color="black" fontWeight="700"
                                        fontSize="36px"
                                        lineHeight="120%" pt={{ base: "10px", md: "36px" }}>Option</Text>
                                    {isMobile ? <Box
                                        borderRadius="10px"
                                        mt="26px"
                                        w="552px"
                                        h="354px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
                                    /> : <Box
                                        borderRadius="10px"
                                        mt="36px"
                                        w="294px"
                                        h="426px"
                                        backgroundSize="cover"
                                        backgroundImage="https://media.tenor.com/l9d2q8-JiQoAAAAM/kermit.gif"
                                    />
                                    }

                                </Box>
                            </Center>
                        </SwiperSlide>
                        <SwiperSlide>
                            <>
                                {isMobile ? (<><Box position="absolute" top={220} left={0}>
                                    <LeftButton><BsArrowLeft color="white" fontSize="50px" /></LeftButton>
                                </Box>
                                </>) : (<></>)}

                                <Center>
                                    <Box>
                                        <Text textAlign="center" color="black" fontWeight="700"
                                            fontSize="36px"
                                            lineHeight="120%" pt={{ base: "10px", md: "36px" }}>Tutorial</Text>
                                        {isMobile ? <Box
                                            borderRadius="10px"
                                            mt="26px"
                                            w="552px"
                                            h="354px"
                                            backgroundSize="cover"
                                            backgroundImage="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
                                        /> : <><Box
                                            borderRadius="10px"
                                            mt="36px"
                                            w="294px"
                                            h="426px"
                                            backgroundSize="cover"
                                            backgroundImage="https://media.tenor.com/l9d2q8-JiQoAAAAM/kermit.gif"
                                        />
                                        </>
                                        }
                                        <Center>


                                            <Button onClick={() => { on(), handleSubmit() }} className="swiper-no-swiping" colorScheme="orange" w={{ base: "179px", md: "183px" }} h={{ base: "53px", md: "61px" }} boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)" mt={{ base: "45px", md: "24px" }}>
                                                <Box>
                                                    <Text fontWeight="700"
                                                        fontSize="14px"
                                                        lineHeight="120%">Start using Dating</Text>
                                                    <Text fontWeight="700"
                                                        fontSize="14px"
                                                        lineHeight="120%">& Finding Friend</Text></Box></Button>
                                        </Center>
                                    </Box>
                                </Center>
                            </>
                        </SwiperSlide>

                    </Swiper>
                }
            </Box >
        </DatingAppBody >
    )
}

export default Tutorial