import { useEffect, useState } from "react"
import API from "src/function/API"

import { Shop_Product,  Shop_Product_Review } from "@apiType/shop"
import { useParams } from "react-router-dom"
import PageTitle from "src/components/shop/PageTitle"
import ShopAppBody from "src/components/shop/ShopAppBody"
import { Image, Text, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Textarea, useBoolean, useDisclosure, useToast, Spacer, Center, Avatar } from "@chakra-ui/react"
import ContentBox from "src/components/shop/ContentBox"
import convertCurrency, { dateFormat, setDataAPI } from "src/components/shop/functions/usefulFunctions"
import ReviewItem from "src/components/shop/ReviewItem"
import ThemedButton from "src/components/shop/ThemedButton"
import { Autoplay, Keyboard, Pagination, Zoom, EffectFade } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Pill from "src/components/shop/Pill"
import { BsStarFill } from "react-icons/bs"
import LoadingDisplay from "src/components/shop/LoadingDisplay"

const index = () => {
    const param = useParams()

    const [product, setProduct] = useState<Shop_Product | null>(null)
    const [reviews, setReviews] = useState<Shop_Product_Review[] | null>(null)

    const [countReviews, setCountReviews] = useState(4)
    const [actionText, setActionText] = useState("Show All")

    const toast = useToast()

    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    const [isErrorReview, { on: onR }] = useBoolean()
    const [isLoadingReview, { off: offR }] = useBoolean(true)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isPostError, setPostError] = useState(false)

    const getProductInfo = API.get("/shop/getProductInformation/" + param.id)
    const getAllReviews = API.get("/shop/getAllReviews/" + param.id)

    const postCartProduct = () => {
        setPostError(false)
        if (param.id !== undefined) {
            API.post("/shop/postCartProduct", {
                productId: parseInt(param.id)
            })
                .then((res) => console.log(res))
                .catch((err) => {
                    setPostError(true)
                    console.log(err);
                })
            if (isPostError == false) {
                toast({
                    title: 'Product Added to Cart Successfully',
                    status: 'success',
                    isClosable: true,
                    duration: 1500,
                })
            } else {
                toast({
                    title: 'Product Already in Cart or some other error occurred',
                    status: 'error',
                    isClosable: true,
                    duration: 1500,
                })
            }
        }
    }
    useEffect(() => {
        getProductInfo.then((res) => { setProduct(res.data) }).catch((err) => on()).finally(() => { off() })
        getAllReviews.then(res => setReviews(res.data)).catch(err => onR()).finally(() => offR())
    }, [])

    if (isLoading) {
        return <LoadingDisplay />
    }
    if (isError || product == null) {
        return (<>
            There is an Error
        </>)
    }

    // Need to calculate overall rating
    let oRating: string | number = " No Rating Yet"
    try {
        if (reviews != null) {
            oRating = calculateAvgReview(reviews)
        }
    } catch (e) { }

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
                            {product.productName}
                        </Text>
                        <Text fontSize={"2xl"} color="black" fontWeight="600">
                            {convertCurrency(parseFloat(product.productPrice))}
                        </Text>
                        <Spacer />
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>BRAND: </Text><Text ml="3" fontSize={"lg"}>{product.brandName}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>DELIVERY: </Text><Text ml="3" fontSize={"lg"}>{convertCurrency(parseFloat(product.deliveryFees))}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>SIZE: </Text><Text ml="3" fontSize={"lg"}>{product.productSize}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>COLOR: </Text><Text ml="3" fontSize={"lg"}>{product.productColor}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text as="b" fontSize={"lg"}>RATING: </Text><Text ml="3" fontSize={"lg"}>{oRating}</Text>
                        </Flex>
                        <Spacer />
                        <ThemedButton width="full" onClick={postCartProduct}>Add to Cart</ThemedButton>
                    </Flex>
                </ContentBox>
            </Grid>
        </Flex>
    )
    const contentBox = (
        <ContentBox>
            <Flex direction="column" p="6">
                <Text fontWeight="500" fontSize="xl" color="black">
                    Product Details of {product.productName}
                </Text>

                <Text pt="3">{product.productDesc}</Text>
                <Flex gap={3} pt="5">
                    <Spacer />
                    <Pill bg="#a5e">
                        <Text color="#fff" as="b" noOfLines={1}>{product.productSize}</Text>
                    </Pill>
                    <Pill bg={"orange"}>
                        <Flex align="center" justify="center" gap={2}>
                            <Text pl={1} color="#fff" as="b" noOfLines={1}>{oRating}</Text>
                            <BsStarFill color="yellow"></BsStarFill>
                        </Flex>
                    </Pill>
                    <Pill bg={"#fff"}>
                        <Box p="2" border="1px solid" borderRadius={"3px"} bg={product.productColor}></Box>
                        <Text color={ "#222"} as="b">{product.productColor}</Text>
                    </Pill>

                </Flex>
            </Flex>
        </ContentBox>
    )
    const reviewBox = (
        <ContentBox >
            <Flex direction="column" gap={3} p={6}>
                <Text fontWeight="500" color="black" fontSize="lg">
                    Reviews of {product.productName}
                </Text>
                {isLoadingReview ? <>Loading ... </> : generateReviews(countReviews, reviews)}
                <Flex justify="space-between" mt="7" wrap="wrap" gap="5">
                    <Button variant="link" onClick={onOpen}>
                        Write Your Own Review
                    </Button>
                    {modalWriteReview(product)}
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
                    Contact Details of {product.productName}
                </Text>
                {product != null ? <Flex direction="column">
                    <Text>Name: {product.contactTo.contactPerson}</Text>
                    <Text>Phone no: {product.contactTo.phoneNo}</Text>
                    {product.contactTo.lineId ? <Text>Line Id: {product.contactTo.lineId}</Text> : <Text></Text>}
                    {product.contactTo.address ? <Text>Address: {product.contactTo.address}</Text> : <Text></Text>}
                </Flex> : <>Cannot Find Contact Details</>
                }
            </Flex>

        </ContentBox>
    )

    if (isErrorReview) {
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
    }

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

    function modalWriteReview(product: Shop_Product) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur="2px" />
                <ModalContent>
                    <ModalHeader>Write Review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Text align="center" fontSize="xl" fontWeight="bold" pb="4">
                                {product.productName}{" "}
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

function slidesGenerator(product: Shop_Product | null) {
    const slides = []
    try {
        if (product != null && product.images.length > 0) {
            const imgs = product.images.map((image) => {
                return image.image
            })
            for (let i = 0; i < imgs.length; i++) {
                slides.push(
                    <SwiperSlide>
                        <Image
                            src={imgs[i]}
                            width={"auto"}
                            minHeight={{ base: "1rem", md: "27rem" }}
                        ></Image>
                    </SwiperSlide>
                )
            }
        } else {
            slides.push(
                <SwiperSlide>
                    <Image
                        borderRadius="3xl"
                        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}
                        width={"auto"}
                        minHeight={{ base: "1rem", md: "27rem" }}
                    ></Image>
                </SwiperSlide>)
        }
    } catch (e) {
        slides.push(
            <SwiperSlide>
                <Image
                    borderRadius="3xl"
                    src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}
                    width={"auto"}
                    minHeight={{ base: "1rem", md: "27rem" }}
                ></Image>
            </SwiperSlide>)
    }
    return slides


}
function generateReviews(count: number, reviews: Shop_Product_Review[] | null) {
    try {
        if (reviews != null) {
            const returnReviews = []

            for (let i = 0; i < reviews.length; i++) {
                returnReviews.push(
                    <ReviewItem
                        userName={reviews[i].user.fName + " " + reviews[i].user.lName}
                        userId={reviews[i].user.userId}
                        reviewTitle={reviews[i].reviewName}
                        reviewBody={reviews[i].reviewDesc}
                        rating={reviews[i].reviewRating}
                        image={reviews[i].image}
                        reviewDate={reviews[i].reviewAt.toString()}
                    ></ReviewItem>)
            }
            return (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {count == -1 ? returnReviews : returnReviews.slice(0, count)}
                </SimpleGrid>
            )
        }
        return (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                No Reviews Found
            </SimpleGrid>
        )
    } catch (error) {
        console.log(error)
        return (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                No Reviews Found
            </SimpleGrid>
        )
    }

}
function calculateAvgReview(reviews: any) {
    let oRating = 0
    for (let i = 0; i < reviews.length; i++) {
        oRating += reviews[i].reviewRating
    }
    return (oRating / reviews.length).toFixed(2)
}
export default index


