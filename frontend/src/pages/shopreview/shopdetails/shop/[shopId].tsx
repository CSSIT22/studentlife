import { useDisclosure, Spacer, Flex, Heading, Image, AspectRatio, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, SimpleGrid, Container, Box } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppBody from 'src/components/share/app/AppBody'
import AmountRate from 'src/components/shopreview/AmountRate'
import AmountReview from 'src/components/shopreview/AmountReview'
import LocationShop from 'src/components/shopreview/LocationShop'
import Rate from 'src/components/shopreview/Rate'
import RatingStar from 'src/components/shopreview/RatingStar'
import ReviewDetail from 'src/components/shopreview/ReviewDetail'
import ShopDetailName from 'src/components/shopreview/ShopDetailName'

import TempUpload from 'src/components/shopreview/TempUpload'
import API from 'src/function/API'
import index from 'src/pages/announcement'

// main component
const shopId = () => {
    const [rating2, setRating] = useState(0) // rating star max = 5
    const [text, setText] = useState("") // review description 
    const [detail, setDetail] = useState<any>([]) // shop's detail fetch from backend
    const [files, setFiles] = useState<any>([]) // array of user's files (pictures)
    const { isOpen, onOpen, onClose } = useDisclosure() // chakra disclosure for open/close modal
    let param = useParams() // get data from param
    const buttons = []
    var numCount = 0
    var numCount2 = 0
    var numCount3 = 0
    var numCount4 = 0
    var numCount5 = 0
    var numCount6 = 0
    var sumRating = 0;
    var AAA = 0;

    // handle onclick
    const onClick = (idx: any) => {
        var x = idx
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating2 === 1 && parseInt(x) === 1) {
            setRating(0)
        } else {
            setRating(parseInt(x))
        }
    }



    const submit = () => {
        const form = new FormData();
        form.append("text", text);
        form.append("rating", rating2 + "");
        form.append("shopId", param.shopId + "");
        files.map((item: any) => {
            form.append("upload", item.file)
        })

        API.post("/shopreview/postmyreview",
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((res) => {
            // console.log(res)
            window.location.reload()
        })
    }
    // fetch shop detail data
    useEffect(() => {
        API.get(`/shopreview/shopdetails/shop/${param.shopId}`)
            .then((res) => setDetail(res.data))
    }, [param])

    // const [rateCheck, setRateCheck] = useState<any>()
    const [amo_rate, setAmountRate] = useState<any>([])
    // useEffect(() => {
    //     API.get(`/shopdetails/shop/${param.shopId}/getcounteachrate?rating=${rateCheck}`)
    //         .then((res) => setAmountRate(res.data))
    // }, [param])
    useEffect(() => {
        API.get(`/shopreview/shopdetails/shop/${param.shopId}/getcountrevieweachrate`)
            .then((res) => setAmountRate(res.data))
    }, [param])
    // console.log(amo_rate)

    const [review, setReview] = useState<any>([])
    const getReview = API.get("/shopreview/getmyreviewDb")
    //show setreview 
    useEffect(() => {
        getReview.then((res) => {
            setReview(res.data)
        })
    }, [])
    // console.log(review)

    useEffect(() => {
        // console.log(files)
    }, [files])
    const navigate = useNavigate()

    function Navigate(target: any) {
        navigate(`/shopreview/review/${target}`)
        window.scrollTo(0, 0)
    }
    const [rates, setRate] = useState<string[]>([])
    function handleSetRate(rate: any) {
        if (!rates.includes(rate)) {
            setRate([...rates, rate])
        } else {
            const newArr = rates.filter((value) => value !== rate)
            setRate(newArr)
        }
    }
    // console.log(rates)
    return (
        <AppBody>
            {detail.map((item: any, index: any) => (
                <ShopDetailName key={index} name={item.shopName} />
            ))}
            {amo_rate.map((item: any) => {
                // console.log(item.rating)
                if (item.rating === 5) {
                    numCount += 1
                    sumRating += 5
                } else if (item.rating === 4) {
                    sumRating += 4
                    numCount2 += 1
                } else if (item.rating === 3) {
                    numCount3 += 1
                    sumRating += 3
                } else if (item.rating === 2) {
                    numCount4 += 1
                    sumRating += 2
                } else if (item.rating === 1) {
                    numCount5 += 1
                    sumRating += 1
                } else if (item.rating === 0) {
                    numCount6 += 1
                }
                let summ = numCount + numCount2 + numCount3 + numCount4 + numCount5 + numCount6
                AAA = sumRating / summ
            })}
            {detail.map((item: any, index: any) => (
                <Box
                    key={index}
                    flex={1}
                    backgroundSize={"120%"}
                    bgImage={item.images[0].image}
                    shadow={"lg"}
                    w={"100%"}
                    height={"sm"}
                    p={4}
                    color="white"
                    padding={5}
                >
                    {/* ?????????????????????????????????????????????????????????????????????????????? fix box amount rate ??????????????????????????????????????? */}
                    <Spacer height={"95%"}></Spacer>
                    <Flex direction="row" justifyContent={"space-between"} alignItems="flex-end">
                        <Heading color="white">
                            <AmountRate ratting={String(AAA).substring(0, 3)} />
                            {/* ?????????????????????????????????????????? database */}
                        </Heading>
                        <Box p={1} minWidth={"60px"} maxWidth={"200px"} height={"25px"} rounded={"2xl"} background={"#FF3939"}>
                            <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                <Heading textAlign={"center"} size={"xs"} color="white">
                                    <AmountReview am_re={item._count.reviews} />
                                    {/* ?????????????????????????????????????????? database */}
                                </Heading>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            ))}
            {detail.map((item: any, index: any) => (
                <Flex key={index} direction="row" justifyContent={"start"} alignItems="start" shadow={"20"}>
                    <Heading padding={10} paddingLeft={"-1"} color={"green"} size={"lg"}>
                        Opening
                    </Heading>
                    <Heading padding={10} size={"lg"}>
                        {item.open} - {item.close}
                    </Heading>
                </Flex>
            ))}
            <Box flex={1} shadow={"lg"} color="white" rounded={0}>
                <AspectRatio ratio={16 / 1} w={"100%"} height={"160px"}>
                    <iframe
                        src={
                            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.1066061015226!2d100.49433491529686!3d13.651278603291741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a251bb6b0cf1%3A0xf656e94ff13324ad!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Lie4Lij4Liw4LiI4Lit4Lih4LmA4LiB4Lil4LmJ4Liy4LiY4LiZ4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1634524662484!5m2!1sth!2sth"
                        }
                    ></iframe>
                </AspectRatio>
            </Box>

            {detail.map((item: any, index: any) => (
                <LocationShop key={index} location={item.address} phoneNumber={item.phoneNo} />
            ))}
            {/* {amo_rate.map((item: any) => {
                    // console.log(item.rating)
                    if (item.rating === 5) {
                        numCount += 1
                        sumRating += 5
                    } else if (item.rating === 4) {
                        sumRating += 4
                        numCount2 += 1
                    } else if (item.rating === 3) {
                        numCount3 += 1
                        sumRating += 3
                    } else if (item.rating === 2) {
                        numCount4 += 1
                        sumRating += 2
                    } else if (item.rating === 1) {
                        numCount5 += 1
                        sumRating += 1
                    } else if (item.rating === 0) {
                        numCount6 += 1
                    }
                    let summ = numCount + numCount2 + numCount3 + numCount4 + numCount5 + numCount6
                    AAA = sumRating / summ
                })} */}
            <SimpleGrid columns={{ base: 3, lg: 6 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                <Rate ratting={"5"} background={"#FF3939"} amo_rate={String(numCount)} handleSetRate={handleSetRate} />
                <Rate ratting={"4"} background={"#1DBC03"} amo_rate={String(numCount2)} handleSetRate={handleSetRate} />
                <Rate ratting={"3"} background={"#1DBC03"} amo_rate={String(numCount3)} handleSetRate={handleSetRate} />
                <Rate ratting={"2"} background={"#39A0FF"} amo_rate={String(numCount4)} handleSetRate={handleSetRate} />
                <Rate ratting={"1"} background={"#39A0FF"} amo_rate={String(numCount5)} handleSetRate={handleSetRate} />
                <Rate ratting={"0"} background={"#838383"} amo_rate={String(numCount6)} handleSetRate={handleSetRate} />
            </SimpleGrid>

            <Box onClick={onOpen} as="button" mt={5} mb={3} width={"100%"}>
                <Heading shadow={"md"} bgColor={"white"} padding={"10"} textAlign={"center"} size={"sm"} rounded={10}>
                    + Addyour
                </Heading>

                {/* pop ups  */}
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={3}>
                {review.map((item: any, index: any) => {
                    // console.log(item)
                    if (param.shopId === item.shopId) {
                        // return (
                        //     <b onClick={() => Navigate(item.reviewId)}>
                        //         <ReviewDetail key={index} image={""} name={item.reviewer.fName + " " + item.reviewer.lName} ment={item.text} date={String(item.reviewedAt).substring(0, 10)} amo_rate={item.rating} amo_like={item.likeReceived} />
                        //     </b>
                        // )
                        if (rates.length === 0) {
                            return (
                                <b key={index} onClick={() => Navigate(item.reviewId)}>
                                    <ReviewDetail reviewId={item.reviewId} key={index} image={""} name={item.reviewer.fName + " " + item.reviewer.lName} ment={item.text} date={String(item.reviewedAt).substring(0, 10)} amo_rate={item.rating} amo_like={item._count.likes} /></b>)
                        } else if (rates.includes(String(item.rating))) {
                            return (<b key={index} onClick={() => Navigate(item.reviewId)}><ReviewDetail reviewId={item.reviewId} key={index} image={""} name={item.reviewer.fName + " " + item.reviewer.lName} ment={item.text} date={String(item.reviewedAt).substring(0, 10)} amo_rate={item.rating} amo_like={item._count.likes} /></b>)
                        }
                    }
                })}
            </SimpleGrid>
            <Container my={5} textAlign={"center"}>
                That's all~
            </Container>
            {/* Modal Component */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mt={3}>
                        <Heading>Add Review</Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <RatingStar rating={rating2} onClick={onClick} size={45} icon="star" scale={5} fillColor="black" strokeColor="grey" />
                        {/* input here */}
                        <Textarea
                            colorScheme="white"
                            focusBorderColor="black"
                            placeholder="Add review"
                            marginTop={"5"}
                            minHeight={"100px"}
                            maxHeight={"200px"}
                            value={text}
                            onChange={(e) => setText(e.target.value)}


                        >
                        </Textarea>
                        <Input type={"file"} id="fileInput" hidden multiple></Input>
                        {/* <Box
                            onClick={() => {
                                document.getElementById("fileInput")?.click()
                            }}
                            as="button"
                            style={{
                                position: "absolute",
                                top: "67%",
                                left: "7%",
                            }}
                        >
                            <Image
                                src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
                                width={"40px"}
                                borderRadius="full"
                            />
                        </Box> */}
                        <TempUpload files={files} setFiles={setFiles} />



                        {/* <Input type={"file"} id="id" hidden multiple></Input>
                        <Box
                            onClick={() => {
                                document.getElementById("id")?.click()
                            }}
                            as="button"
                            paddingTop={"10px"}
                        >
                            <Image
                                src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
                                width={"40px"}
                                borderRadius="full"
                                marginLeft={"1"}
                                marginTop={"-58px"}
                                padding={"4px"}
                            />
                        </Box> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button bgColor={"green"} color="white" onClick={submit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* End of Modal Component */}
        </AppBody >
    )
}

export default shopId