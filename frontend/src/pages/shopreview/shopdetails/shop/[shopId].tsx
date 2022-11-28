import { useDisclosure, Spacer, Flex, Heading, Image, AspectRatio, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, SimpleGrid, Container, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

const shopId = () => {
    const [rating, setRating] = React.useState(0)
    const buttons = []


    const onClick = (idx: any) => {
        var x = idx
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && parseInt(x) === 1) {
            setRating(0)
        } else {
            setRating(parseInt(x))
        }
    }
    window.scrollTo(0, 0)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [text, setText] = useState("")
    
    const submit = () => {

        API.post("/shopreview/postmyreview", { 
            text: text,
            shopId:param.shopId,
         }).then((res) => {
            console.log(res)
            window.location.reload()
        })
    }


    let param = useParams()
    const [detail, setDetail] = useState<any>([])

    useEffect(() => {
        API.get(`/shopreview/shopdetails/shop/${param.shopId}`)
            .then((res) => setDetail(res.data))
    }, [param])
    // for writing and link with back to database



    return (
        <AppBody>
            {detail.map((item: any) => (
                <ShopDetailName name={item.shopName} />
            ))}
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

            {detail.map((item: any) => (
                <LocationShop location={item.address} phoneNumber={item.phoneNo} />
            ))}
            <Rate />

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
                        <RatingStar size={45} icon="star" scale={5} fillColor="black" strokeColor="grey" />
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
                        <Input type={"file"} id="id" hidden multiple></Input>

                        <TempUpload />

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

                        <Button bgColor={"green"} color="white" onClick={submit}>
                            Submit
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={3}>
                <ReviewDetail
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Micky"}
                    ment={"Love this so much!!!"}
                    date={"2022/05/18"}
                />
                <ReviewDetail
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Minny"}
                    ment={"Yummy"}
                    date={"2020/10/10"}
                />
            </SimpleGrid>
            <Container my={5} textAlign={"center"}>
                That's all~
            </Container>
        </AppBody>
    )
}

export default shopId