import { useEffect, useState } from "react"
import API from "src/function/API"

import { Product } from "@apiType/shop"
import { useParams } from "react-router-dom"
import PageTitle from "src/components/shop/PageTitle"
import ShopAppBody from "src/components/shop/ShopAppBody"
import { Image, Text, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Textarea, useBoolean, useDisclosure, useToast, Spacer, Center } from "@chakra-ui/react"
import { contacts } from "src/components/shop/content/dummyData/contacts"
import ContentBox from "src/components/shop/ContentBox"
import convertCurrency from "src/components/shop/functions/usefulFunctions"
import ReviewItem from "src/components/shop/ReviewItem"
import ThemedButton from "src/components/shop/ThemedButton"
import { Autoplay, Keyboard, Pagination, Zoom, EffectFade } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Pill from "src/components/shop/Pill"
import { BsStarFill } from "react-icons/bs"

const index = () => {
    const param = useParams()
    const [product, setProduct] = useState<any>(null)
    const [countReviews, setCountReviews] = useState(4)
    const [actionText, setActionText] = useState("Show All")
    const toast = useToast()
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getProductInfo = API.get("/shop/getProductInformation/" + param.id)
    useEffect(() => {
        getProductInfo.then((res) => setProduct(res.data)).catch((err) => on()).finally(() => off())
    }, [])
    if (isLoading) {
        return <>
            Loading
        </>
    }
    if (isError) {
        return (<>
            There is an Error
        </>)
    }
    const contact =
        contacts.find((c) => c.contactId === product.contactId) != undefined
            ? contacts.filter((c) => c.contactId === product.contactId)[0]
            : contacts[0]

    // Need to calculate overall rating
    const oRating = 4

    const productBox = (
        <Flex gap={2}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={2}>
                <ContentBox bg="#fff">
                    <Swiper
                        effect={"slide"}
                        grabCursor={true}
                        slidesPerView={1}
                        loop
                        modules={[Autoplay, Keyboard, Pagination, Zoom, EffectFade]}
                        autoplay={true}
                        keyboard={true}
                        pagination={true}
                        className="mySwiper"
                    >
                        {slidesGenerator(product)}
                    </Swiper>
                </ContentBox>
                <ContentBox bg="#fff">
                    <Flex p={6} direction="column" justify="space-between" gap={3}>
                        <Text fontSize={"4xl"} color="black" fontWeight="700">
                            {product.name}
                        </Text>
                        <Text fontSize={"2xl"} color="black" fontWeight="600">
                            {convertCurrency(product.price)}
                        </Text>
                        <Spacer />
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>BRAND: </Text><Text ml="3" fontSize={"lg"}>{product.brand}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>DELIVERY: </Text><Text ml="3" fontSize={"lg"}>{convertCurrency(product.deliveryFee)}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>SIZE: </Text><Text ml="3" fontSize={"lg"}>{product.size}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>COLOR: </Text><Text ml="3" fontSize={"lg"}>{product.color}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>RATING: </Text><Text ml="3" fontSize={"lg"}>{oRating}</Text>
                        </Flex>
                        <Spacer />
                        <ThemedButton width="full" onClick={() => toast({
                            title: 'Product Added to Cart Successfully',
                            status: 'success',
                            isClosable: true,
                            duration: 1500,
                        })}>Add to Cart</ThemedButton>
                    </Flex>
                </ContentBox>
            </Grid>
        </Flex>
    )

  
    const contentBox = (
        <ContentBox>
            <Flex direction="column" p="6">
                <Text fontWeight="500" fontSize="xl" color="black">
                    Product Details of {product.name}
                </Text>

                <Text pt="3">{product.description}</Text>
                <Flex gap={3} pt="5">
                    <Spacer />
                    <Pill bg="#a5e">
                        <Text color="#fff" as="b" noOfLines={1}>{product.size}</Text>
                    </Pill>
                    <Pill bg={"orange"}>
                        <Flex align="center" justify="center" gap={2}>
                            <Text pl={1} color="#fff" as="b" noOfLines={1}>{oRating}</Text>
                            <BsStarFill color="yellow"></BsStarFill>
                        </Flex>
                    </Pill>
                    <Pill bg={product.color}>
                        <Text color={product.color.toLowerCase() == "white" ? "#222" : "#fff"} as="b">{product.color}</Text>
                    </Pill>

                </Flex>
            </Flex>
        </ContentBox>
    )

    const reviewBox = (
        <ContentBox >
            <Flex direction="column" gap={3} p={6}>
                <Text fontWeight="500" color="black" fontSize="lg">
                    Reviews of {product.name}
                </Text>
                {generateReviews(countReviews)}
                <Flex justify="space-between" mt="7" wrap="wrap" gap="5">
                    <Button variant="link" onClick={onOpen}>
                        Write Your Own Review
                    </Button>
                    {modalWriteReview()}
                    <Button
                        variant="link"
                        onClick={function () {
                            if (countReviews == -1) {
                                setActionText("Show All")
                                setCountReviews(4)
                            } else {
                                setCountReviews(-1)
                                setActionText("Hide")
                            }
                        }}
                    >
                        {actionText}
                    </Button>
                </Flex>
            </Flex>
        </ContentBox>
    )
    const contactBox = (
        <ContentBox>
            <Flex p="6" direction="column" gap="3">
                <Text color="black" fontWeight="500" fontSize="lg">
                    Contact Details of {product.name}
                </Text>
                <Flex direction="column">
                    <Text>Phone no: {contact.phoneNo}</Text>
                    {contact.lineId ? <Text>Line Id: {contact.lineId}</Text> : <Text></Text>}
                    {contact.address ? <Text>Address: {contact.address}</Text> : <Text></Text>}
                </Flex>
            </Flex>
        </ContentBox>
    )
    return (
        <ShopAppBody>
            <PageTitle title="Product Details" />
            <Flex direction="column" gap={6}>
                {productBox}
                {contentBox}
                {reviewBox}
                {contactBox}
            </Flex>
            <Box p="8"></Box>
        </ShopAppBody>
    )

    function modalWriteReview() {
        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur="2px" />
                <ModalContent>
                    <ModalHeader>Write Review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Text align="center" fontSize="xl" fontWeight="bold" pb="4">
                                {product.name}{" "}
                            </Text>
                            <Flex gap={3} direction="column" justify="space-evenly">
                                <HStack justify="space-around">
                                    <FormLabel>Choose Rating</FormLabel>
                                    <Select>
                                        <option value="1star">1 Star</option>
                                        <option value="2star">2 Star</option>
                                        <option value="3star">3 Star</option>
                                        <option value="4star">4 Star</option>
                                        <option value="5star">5 Star</option>
                                    </Select>
                                </HStack>
                                <HStack>
                                    <FormLabel>Review Title</FormLabel>
                                    <Input type="text"></Input>
                                </HStack>
                                <HStack>
                                    <FormLabel>Tell us your experience</FormLabel>
                                    <Textarea></Textarea>
                                </HStack>
                                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                    <GridItem w="100%" h="10">
                                        <Text>Upload Image</Text>{" "}
                                    </GridItem>
                                    <GridItem colSpan={2} w="100%" h="10">
                                        <Input type="file" accept="image/*"></Input>
                                    </GridItem>
                                </Grid>
                            </Flex>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button w="full" colorScheme="blue" mr={3} onClick={onClose}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
}

function slidesGenerator(product: any) {
    const slides = []
    for (let i = 0; i < 5; i++) {
        slides.push(
            <SwiperSlide>
                <Image
                    borderRadius="3xl"
                    src={product.image}
                    width={"auto"}
                    minHeight={{ base: "1rem", md: "27rem" }}
                ></Image>
            </SwiperSlide>
        )
    }
    return slides
}
function generateReviews(count: number) {
    const reviews = []
    if (count == -1) count = 50
    for (let i = 0; i < count; i++) {
        reviews.push(
            <ReviewItem
                userName="Jack Phill"
                userPhoto="https://i2-prod.getsurrey.co.uk/incoming/article14551754.ece/ALTERNATES/s1200d/Jack-Phillips-a-well-known-Titanic-hero-from-Godalming.jpg"
                reviewTitle={"Wow Great"}
                reviewBody={"I bought this phone and this has great features, I highly recommend buying this phone".repeat(5)}
                rating={5}
                image="https://auspost.com.au/shop/static/WFS/AusPost-Shop-Site/-/AusPost-Shop-auspost-B2CWebShop/en_AU/feat-cat/category-tiles/MP_UnlockedPhones_3.jpg"
                reviewDate="09 Sep 2020"
            ></ReviewItem>
        )
    }
    return (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {reviews}
        </SimpleGrid>
    )
}

export default index

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean }) {
    throw new Error("Function not implemented.")
}
