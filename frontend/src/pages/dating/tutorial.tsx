import { Box, Button, Center, Text, useBoolean, useBreakpointValue, useToast } from '@chakra-ui/react'
import DatingAppBody from 'src/components/dating/DatingAppBody'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Lottie from "lottie-react"
import DatingLoading from "../../components/dating/lottie/DatingLoading.json"
import { useEffect, useState } from 'react'
import API from 'src/function/API'
import { useNavigate } from 'react-router-dom'
import DatingWentWrong from 'src/components/dating/DatingWentWrong'
import { motion } from "framer-motion"


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
    let count = 1

    useEffect(() => {
        if (didMount && count == 1) {
            count--
            window.scrollTo(0, 0)
            API.get("/dating/verifyEnroll/getDetail").then((detail) => {
                function getAge(dateString: Date) {
                    var today = new Date()
                    var birthDate = new Date(dateString)
                    var age = today.getFullYear() - birthDate.getFullYear()
                    var m = today.getMonth() - birthDate.getMonth()
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--
                    }
                    return age
                }
                if (!detail.data.sex || !detail.data.birth) {
                    toast({
                        title: "It looks like some of your details are missing!",
                        status: "warning",
                        duration: 10000,
                        isClosable: true,
                        position: "top",
                        description: "Please specify your \"birth date\" and \"sex\" before using Dating & Finding Friend."
                    })
                    navigate("/user")
                }
                else if (getAge(detail.data.birth) < 18) {
                    toast({
                        title: "You don't meet the minimum age requirement!",
                        status: "warning",
                        duration: 10000,
                        isClosable: true,
                        position: "top",
                        description: "You are required to be at least 18 years old to use Dating & Finding Friend."
                    })
                    navigate("/")
                }
                else if (getAge(detail.data.birth) > 40) {
                    toast({
                        title: "You don't meet the maximum age requirement!",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                        description: "You are required to be at most 40 years old to use Dating & Finding Friend."
                    })
                    navigate("/")
                }
            })
            API.get("/dating/tutorial/getUserProfile")
                .then((userProfile) => {
                    setFName(userProfile.data.fName)
                    setLName(userProfile.data.lName)
                })
                .catch((err) => setIsError(true))
                .finally(off)
        }
    })

    const letters = Array.from("LOADING . . .");

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
            .catch((err) => setIsError(true))
    }

    return (
        <DatingAppBody>
            <Box>
                {(isSubmitted || isLoading) && !isError ? <>
                    <Box w="800px" h="400px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "450px", md: "400px" }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 360,
                                damping: 20,
                            }}>
                            <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.6" }} />
                        </motion.div>
                    </Box>

                    <Box w="350px" h="100px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "180px", md: "125px" }}>
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: `0.25em`
                            }}
                            animate={{
                                opacity: 1,
                                y: `0em`,
                                transition: {
                                    duration: 1,
                                    ease: [0.2, 0.65, 0.3, 0.9],
                                }
                            }}
                        >
                            <Text mt="-25%" textAlign="center" color="black" fontWeight="700" fontSize={{ base: "2xl", md: "5xl" }} lineHeight="120%" pl="18px" >
                                LOADING
                            </Text>
                        </motion.div>
                    </Box>

                </> :
                    !isError ? <Swiper id="tutorial" pagination={true} modules={[Pagination]} className="mySwiper">
                        <SwiperSlide>
                            <Center>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 360,
                                        damping: 20,
                                    }}>
                                    <Box>
                                        <Text textAlign="center" fontWeight="700"
                                            fontSize={{ base: "30px", md: "36px" }}
                                            lineHeight="133%" color="black" pt={{ base: "39.5px", md: "53px" }} >Hello!</Text>
                                        {
                                            isMobile ?
                                                (<Text textAlign="center" fontWeight="700"
                                                    fontSize="36px"
                                                    lineHeight="133%" color="orange.600" pt="33px" >{fName}&nbsp;{lName}</Text>) :
                                                (<><Text textAlign="center" fontWeight="700"
                                                    fontSize="30px"
                                                    lineHeight="133%" color="orange.600" pt="39.5px">{fName}</Text>
                                                    <Text textAlign="center" fontWeight="700"
                                                        fontSize="30px"
                                                        lineHeight="133%" color="orange.600" >{lName}</Text></>)
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
                                </motion.div>
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
                                        fontSize={{ base: "20px", md: "36px" }}
                                        lineHeight="120%" pt="36px" pb={{ base: "6px", md: "0px" }}>Discover many new people!</Text>
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
                                        fontSize={{ base: "20px", md: "36px" }}
                                        lineHeight="120%" pt="36px" pb={{ base: "6px", md: "0px" }}>Check your heart history!</Text>
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
                                        fontSize={{ base: "20px", md: "36px" }}
                                        lineHeight="120%" pt="36px" pb={{ base: "6px", md: "0px" }}>Chat with your matches!</Text>
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
                                        fontSize={{ base: "20px", md: "36px" }}
                                        lineHeight="120%" pt="36px" pb={{ base: "6px", md: "0px" }}>Apply for a group activity!</Text>
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
                                        fontSize={{ base: "20px", md: "36px" }}
                                        lineHeight="120%" pt="36px" pb={{ base: "6px", md: "0px" }}>Select your interests!</Text>
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
                                        fontSize={{ base: "20px", md: "36px" }}
                                        lineHeight="120%" pt="36px" pb={{ base: "6px", md: "0px" }}>Set the discovery criteria!</Text>
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
                                            fontSize={{ base: "20px", md: "36px" }}
                                            lineHeight="120%" pt="36px" pb={{ base: "6px", md: "0px" }}>Replay the tutorial at anytime!</Text>
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


                                            <Button onClick={() => { on(), handleSubmit() }} className="swiper-no-swiping" colorScheme="orange" w={{ base: "179px", md: "183px" }} h={{ base: "53px", md: "61px" }} boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)" mt={{ base: "35px", md: "24px" }}>
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

                    </Swiper> : <Box display="flex" h="66vh" justifyContent="center" alignItems="center">
                        <DatingWentWrong />
                    </Box>
                }
            </Box >
        </DatingAppBody >
    )
}

export default Tutorial