import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Text,
    Grid,
    GridItem,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    FormControl,
    FormLabel,
    Select,
    InputGroup,
    Input,
    HStack,
    VStack,
    Textarea,
} from "@chakra-ui/react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { contacts } from "src/components/shop/content/dummyData/contacts"
import { products } from "src/components/shop/content/dummyData/products"
import { EffectFade } from "swiper"
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import ContentBox from "../../../components/shop/ContentBox"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import PageTitle from "../../../components/shop/PageTitle"
import ReviewItem from "../../../components/shop/ReviewItem"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import ThemedButton from "../../../components/shop/ThemedButton"

// Get info from databse and request
const productDetail = () => {
    const location = useLocation()
    const product_id = location.state.p_id
    const product =
        products.find((p) => p.productId === product_id) != undefined ? products.filter((p) => p.productId === product_id)[0] : products[0]
    const contact =
        contacts.find((c) => c.contactId === product.contactId) != undefined
            ? contacts.filter((c) => c.contactId === product.contactId)[0]
            : contacts[0]
    // Need to calculate overall rating
    const oRating = 4

    const [countReviews, setCountReviews] = useState(4)
    const [actionText, setActionText] = useState("Show All")

    const productBox = (
        <ContentBox>
            <Grid templateRows="repeat(5, 1fr)" templateColumns="repeat(4, 1fr)" gap={7} p="4">
                <GridItem rowSpan={{ base: 5, md: 5 }} colSpan={{ base: 4, md: 1 }} overflow={"hidden"}>
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
                </GridItem>
                <GridItem rowSpan={2} colSpan={{ base: 4, md: 3 }}>
                    <Text fontSize={"xl"} color="black" fontWeight="500">
                        {product.name}
                    </Text>
                    <Text>Overall Rating: {oRating}</Text>
                    <Text>Sold By: {product.brand}</Text>
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 3 }}>
                    <Box bg="red" p="0.3"></Box>
                </GridItem>
                <GridItem rowSpan={2} colSpan={{ base: 4, md: 3 }}>
                    <Text fontSize={"lg"} color="black" fontWeight="500">
                        Price: {convertCurrency(product.price)}
                    </Text>
                    <Text>Delivery Fees: {convertCurrency(product.deliveryFee)}</Text>
                </GridItem>
                <GridItem colSpan={4}>
                    <ThemedButton width="full">Add to Cart</ThemedButton>
                </GridItem>
            </Grid>
        </ContentBox>
    )
    const contentBox = (
        <ContentBox>
            <Flex direction="column" p="6">
                <Text fontWeight="500" fontSize="xl" color="black">
                    Product Details of {product.name}
                </Text>
                <Text pt="3">Size: {product.size}</Text>
                <Text>Color: {product.color}</Text>
                <Text pt="3">{product.description}</Text>
            </Flex>
        </ContentBox>
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const reviewBox = (
        <ContentBox>
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

export default productDetail
