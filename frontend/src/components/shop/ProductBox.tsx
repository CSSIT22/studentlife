import { Shop_Product } from "@apiType/shop"
import { Flex, Spacer, Grid, Text, Image, useToast } from "@chakra-ui/react"
import { FC } from "react"
import ContentBox from "src/components/shop/ContentBox"
import convertCurrency from "src/components/shop/functions/usefulFunctions"
import ThemedButton from "src/components/shop/ThemedButton"
import API from "src/function/API"
import { Autoplay, Keyboard, Pagination, Zoom, EffectFade } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

const ProductBox: FC<{ product: Shop_Product, oRating: string | number }> = ({ product, oRating }) => {
    const toast = useToast()
    const postCartProduct = () => {
        API.post("/shop/postCartProduct", {
            productId: product.productId
        })
            .then((res) => toast({
                title: 'Product Added to Cart Successfully',
                status: 'success',
                isClosable: true,
                duration: 1500,
            }))
            .catch((err) => {
                toast({
                    title: 'Product Already in Cart or some other error occurred',
                    status: 'error',
                    isClosable: true,
                    duration: 1500,
                })
            })
    }
    return (
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
                    <SwiperSlide key={imgs[i]}>
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

export default ProductBox

