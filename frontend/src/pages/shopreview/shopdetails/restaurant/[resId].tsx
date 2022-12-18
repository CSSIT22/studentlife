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
import API from 'src/function/API'
import rating from 'src/pages/dating/rating'

const restId = () => {
    window.scrollTo(0, 0)
    const [rating, setRating] = useState(0) // rating star max = 5
    const { isOpen, onOpen, onClose } = useDisclosure()
    let param = useParams()
    const [detail, setDetail2] = useState<any>([])
    useEffect(() => {
        API.get(`/shopreview/shopdetails/restaurant/${param.resId}`)
            .then((res) => setDetail2(res.data))
    }, [param])
    console.log(detail)
    const [review, setReview] = useState<any>([])
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

    const navigate = useNavigate()
    function Navigate(target: any) {
        navigate(`/shopreview/review/${target}`)
        window.scrollTo(0, 0)
    }

    return (
        <AppBody>
            {detail.map((item: any) => {
                return (
                    <ShopDetailName name={item.resName} />
                )
            })}
            {detail.map((item: any) => (
                <Box
                    flex={1}
                    bgImage={item.images[0].image}
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
                            <AmountRate ratting={item.aveRating} />
                            {/* ดีงข้อมูลมาจาก database */}
                        </Heading>
                        <Box p={1} minWidth={"60px"} maxWidth={"200px"} height={"25px"} rounded={"2xl"} background={"#FF3939"}>
                            <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                <Heading textAlign={"center"} size={"xs"} color="white">
                                    <AmountReview am_re={item.reviewReceived} />
                                    {/* ดีงข้อมูลมาจาก database */}
                                </Heading>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            ))}
            {detail.map((item: any) => (
                <Flex direction="row" justifyContent={"start"} alignItems="start" shadow={"20"}>
                    <Heading padding={10} paddingLeft={"-1"} color={"green"} size={"lg"}>
                        Opening
                    </Heading>
                    <Heading padding={10} size={"lg"}>
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

            {detail.map((item: any) => (
                <LocationShop location={item.detail.zone} phoneNumber={item.detail.phoneNo} />
            ))}
            <SimpleGrid columns={{ base: 3, lg: 6 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                <Rate ratting={"5"} background={"#FF3939"} amo_rate={"3k"} />
                <Rate ratting={"4"} background={"#1DBC03"} amo_rate={"2"} />
                <Rate ratting={"3"} background={"#1DBC03"} amo_rate={"1"} />
                <Rate ratting={"2"} background={"#39A0FF"} amo_rate={"55"} />
                <Rate ratting={"1"} background={"#39A0FF"} amo_rate={"80"} />
                <Rate ratting={"0"} background={"#838383"} amo_rate={"26"} />
            </SimpleGrid>

            <Box onClick={onOpen} as="button" mt={5} width={"100%"}>
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

                        <Textarea
                            colorScheme="white"
                            focusBorderColor="black"
                            placeholder="Add review"
                            marginTop={"5"}
                            minHeight={"100px"}
                            maxHeight={"200px"}
                        ></Textarea>
                        <Input type={"file"} id="id" hidden multiple></Input>
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
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button bgColor={"green"} color="white">
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={3}>
                {review.map((item: any) => {
                    if (param.resId === item.resId) {
                        return (
                            <b onClick={() => Navigate(item.reviewId)}>
                                <ReviewDetail image={""} name={item.reviewer.fName + " " + item.reviewer.lName} ment={item.text} date={item.reviewedAt} amo_rate={item.rating} amo_like={item.likeReceived} />
                            </b>
                        )
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