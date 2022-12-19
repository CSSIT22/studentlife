import { useDisclosure, Spacer, Flex, Heading, Image, AspectRatio, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, SimpleGrid, Container, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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
import rating from 'src/pages/dating/rating'

const restId = () => {
    var numCount = 0
    var numCount2 = 0
    var numCount3 = 0
    var numCount4 = 0
    var numCount5 = 0
    var numCount6 = 0
    var sumRating = 0;
    var AAA = 0;
    const [rating, setRating] = useState(0) // rating star max = 5
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [review, setReview] = useState<any>([])
    const navigate = useNavigate()
    const [detail, setDetail2] = useState<any>([])
    let param = useParams()
    const [text, setText] = useState("") // review description 
    const [files, setFiles] = useState<any>([]) // array of user's files (pictures)

    const submit = () => {
        // console.log("do");

        // if (!text) {
        //     console.log("NOT SUBMITTED")
        //     return;
        // }

        const form = new FormData();
        form.append("text", text);
        form.append("rating", rating + "");
        form.append("resId", param.resId + "");
        files.map((item: any) => {
            form.append("upload", item.file)
            // shopId: ∏
        })
        console.log(text, rating, param.resId,);

        API.post("/shopreview/postmyreview",
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((res) => {
            console.log(res)
            window.location.reload()
        })

    }



    //show setreview 
    useEffect(() => {
        getReview.then((res) => {
            setReview(res.data)
        })
    }, [])
    console.log(review)



    useEffect(() => {
        API.get(`/shopreview/shopdetails/restaurant/${param.resId}`)
            .then((res) => setDetail2(res.data))
    }, [param])
    // console.log(detail)
    const getReview = API.get("/shopreview/getmyreviewDb")
    useEffect(() => {
        getReview.then((res) => {
            setReview(res.data)
        })
    }, [])
    const onClick = (idx: any) => {
        var x = idx
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && parseInt(x) === 1) {
            setRating(0)
        } else {
            setRating(parseInt(x))
        }
    }

    const [amo_rate, setAmountRate] = useState<any>([])
    useEffect(() => {
        API.get(`/shopreview/shopdetails/restaurant/${param.resId}/getcountrevieweachraterestaurant`)
            .then((res) => setAmountRate(res.data))
    }, [param])

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
    return (
        <AppBody>
            {detail.map((item: any, index: any) => {
                return (
                    <ShopDetailName key={index} name={item.resName} />
                )
            })}
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
                    backgroundSize={"cover"}
                    flex={1}
                    bgImage={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.images[0].image}&key=AIzaSyApH4DrOZv8gyZjUEDWOy3wGDSxtGK6ypM`}
                    shadow={"lg"}
                    w={"100%"}
                    height={"sm"}
                    p={4}
                    color="white"
                    padding={5}
                >
                    {/* คุยกับโจข้อแก้การเพิ่มขนาด fix box amount rate ใหม่ของตรงนี้ */}
                    <Spacer height={"95%"}></Spacer>
                    <Flex direction="row" justifyContent={"space-between"} alignItems="flex-end">
                        <Heading color="white">
                            <AmountRate ratting={String(AAA).substring(0, 3)} />
                            {/* ดีงข้อมูลมาจาก database */}
                        </Heading>
                        <Box p={1} minWidth={"60px"} maxWidth={"200px"} height={"25px"} rounded={"2xl"} background={"#FF3939"}>
                            <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                <Heading textAlign={"center"} size={"xs"} color="white">
                                    <AmountReview am_re={item._count.reviews} />
                                    {/* ดีงข้อมูลมาจาก database */}
                                </Heading>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            ))}
            {detail.map((item: any, index: any) => (
                <Flex direction="row" justifyContent={"start"} alignItems="start" shadow={"20"}>
                    <Heading padding={10} paddingLeft={"-1"} color={"green"} size={"lg"}>
                        Opening
                    </Heading>
                    <Heading key={index} padding={10} size={"lg"}>
                        {item.openAt[0].open} - {item.closeAt[0].close}
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
                <LocationShop key={index} location={item.detail.zone} phoneNumber={item.detail.phoneNo} />
            ))}
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

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mt={3}>
                        <Heading>Add Review</Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <RatingStar rating={rating} onClick={onClick} size={45} icon="star" scale={5} fillColor="black" strokeColor="grey" />
                        {/* input here */}
                        <Textarea
                            required
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
                        <Button bgColor={"green"} color="white" onClick={(e) => { submit(); e.preventDefault() }}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={3}>
                {review.map((item: any, index: any) => {
                    if (param.resId === item.resId) {
                        if (rates.length === 0) {
                            return (<b key={index} onClick={() => Navigate(item.reviewId)}><ReviewDetail reviewId={""} key={index} image={""} name={item.reviewer.fName + " " + item.reviewer.lName} ment={item.text} date={String(item.reviewedAt).substring(0, 10)} amo_rate={item.rating} amo_like={item.likeReceived} /></b>)
                        } else if (rates.includes(String(item.rating))) {
                            return (<b key={index} onClick={() => Navigate(item.reviewId)}><ReviewDetail reviewId={""} key={index} image={""} name={item.reviewer.fName + " " + item.reviewer.lName} ment={item.text} date={String(item.reviewedAt).substring(0, 10)} amo_rate={item.rating} amo_like={item.likeReceived} /></b>)
                        }
                    }
                })}
            </SimpleGrid>
            <Container my={5} textAlign={"center"}>
                That's all~
            </Container>
        </AppBody>
    )
}

export default restId