import { useBreakpointValue, Flex, Grid, GridItem, Box, Text, Checkbox, Button, Input, LinkBox, useBoolean, Spinner } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import convertCurrency, { setDataAPI, updateDataAPI } from "../../../components/shop/functions/usefulFunctions"
import CartProduct from "src/components/shop/CartProduct"
import ContentBox from "src/components/shop/ContentBox"
import ThemedButton from "src/components/shop/ThemedButton"
import TitleBox from "src/components/shop/TItleBox"
import { useEffect, useState } from "react"
import { Shop_Cart, Shop_Coupon } from "@apiType/shop"
import API from "src/function/API"

// Cart
const Cart = () => {
    const [cartProducts, setCartProducts] = useState<Shop_Cart[] | null>(null)
    const [updates, setUpdates] = useState<number>(0)

    const [couponCode, setCouponCode] = useState<string>("")
    const [couponDiscount, setCouponDiscount] = useState<number>(0)
    const [errorCouponMsg, setErrorMsg] = useState("Coupon is invalid!")
    const [userCoupons, setCoupons] = useState<Shop_Coupon[] | null>(null)
    const [isErrorCoupon , setErrorCoupon] = useState<boolean>(false)
    const [isCouponSuccess, setCouponSuccess] = useState<boolean>(false)

    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get("/shop/getAllProductsInCart")
    useEffect(() => {
        getData.then((res) => {setCartProducts(res.data)}).catch((err) => on()).finally(() => off())
        API.get("/shop/getAllCoupons").then(res => setCoupons(res.data)).catch(err => console.log(err))
        clearCoupon()
    }, [updates])
    let st = 0, dt = 0
    cartProducts?.forEach(cartProduct => {
        st += parseFloat(cartProduct.product.productPrice) * cartProduct.quantity
        dt += parseFloat(cartProduct.product.deliveryFees)
    })
    const summeryData = {
        subtotal: st,
        deliveryTotal: dt,
        total: st + dt - couponDiscount
    }
    const errorText = {
        fontWeight: "600",
        color: "red"
    }
    const clearCoupon = () => {
        setCouponSuccess(false)
        setErrorCoupon(false)
        setCouponCode("")
        setCouponDiscount(0)
    }
    const couponSuccess = (discountAmount: number) => {
        setCouponDiscount(discountAmount)
        setCouponSuccess(true)
        setErrorCoupon(false)
    }
    const applyCoupon = () => {
        if (userCoupons != null && userCoupons.length > 0){
            for (let i = 0; i < userCoupons.length; i++){
                if (userCoupons[i].couponCode.toLowerCase() == couponCode.toLowerCase()){
                    let expDate =  new Date(userCoupons[i].validTill.toString())
                    let now = new Date()
                    if (userCoupons[i].quota > 0 ){
                        if (now < expDate ){
                            if (parseFloat(userCoupons[i].minimumSpend) <= summeryData.total){
                                couponSuccess(parseFloat(userCoupons[i].discount))
                                return
                            }
                            setErrorCoupon(true)
                            setErrorMsg("Minimum Amount for coupon usage has not been reached")
                            return
                        }
                        setErrorCoupon(true)
                        setErrorMsg("Coupon has Expired")
                        return
                    }
                    setErrorCoupon(true)
                    setErrorMsg("Coupon Redemption Limit Reached")
                    return
                }
            }
            setErrorCoupon(true)
            setErrorMsg("Coupon not in user's coupons")
        } else {
            setErrorCoupon(true)
            setErrorMsg("User does not have coupon")
        }
    }
    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setCouponCode(e.target.value)
    }
    const orderSummary = (
        <ContentBox bg="#fff">
            <Flex direction="column" gap={5} p="5">
                <Text fontSize="md" fontWeight="700">Order Summary</Text>
                <Flex gap={2} justify="space-between">
                    <Text>Subtotal</Text>
                    <Text as="b">{convertCurrency(summeryData.subtotal)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>TotalDelivery</Text>
                    <Text as="b">{convertCurrency(summeryData.deliveryTotal)}</Text>
                </Flex>
                {!isCouponSuccess &&<Flex gap={2} justify="space-between">
                    <Input
                        type="text"
                        placeholder="Enter Coupon Code"
                        shadow="md"
                        border="1px solid #CBD5E0"
                        borderRadius="10px"
                        size={"md"}
                        background="white"
                        value = {couponCode}
                        onChange = {handleChange}
                    ></Input>
                    <ThemedButton maxW="24" onClick={applyCoupon}> APPLY </ThemedButton>
                </Flex> }
                {isCouponSuccess && <Flex gap={2} justify="space-between">
                    <Text>Coupon Discount</Text>
                    <Text as="b">{convertCurrency(couponDiscount)}</Text>
                </Flex>}
                {isErrorCoupon && <Text sx = {errorText}>{errorCouponMsg}</Text>}
                <Link to={"/shop/other/coupons"}>
                    <Button variant="link" width="min">
                        See Your Coupons
                    </Button>
                </Link>
                <Flex gap={2} justify="space-between">
                    <Text >Total</Text>
                    <Text as="b">{convertCurrency(summeryData.total)}</Text>
                </Flex>
                <Flex justify="center" >
                    <LinkBox>
                        <Link to="../shop/checkout" state={{couponDiscount: couponDiscount}}>
                            <ThemedButton>CHECKOUT</ThemedButton>
                        </Link>
                    </LinkBox>
                </Flex>
            </Flex>

        </ContentBox>
    )
    return (
        <ShopAppBody>
            <PageTitle title="Cart" />

            <Grid templateColumns="3fr 2fr" gap={5}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex direction="column" gap={5}>
                        <TitleBox title="Products in Cart"></TitleBox>
                        {isError? <>There Was an Error</> : isLoading? <Spinner /> : generateCartProducts(cartProducts, setUpdates)}
                    </Flex>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    {orderSummary}
                </GridItem>
            </Grid>

        </ShopAppBody>
    )
}

function generateCartProducts(cartProducts: Shop_Cart[] | null, setUpdates: React.Dispatch<React.SetStateAction<number>>){
    try {
        
        if (cartProducts != null && cartProducts.length > 0) {
            let cart = []
            for (let i = 0; i < cartProducts.length; i++) {
                cart.push(
                    <CartProduct
                        productId={cartProducts[i].productId}
                        quantity={cartProducts[i].quantity}
                        images={cartProducts[i].product.images} 
                        productName={cartProducts[i].product.productName} 
                        productPrice={parseFloat(cartProducts[i].product.productPrice)} 
                        productStock={cartProducts[i].product.productStock}
                        setUpdates = {setUpdates}                        
                        />
                )
            }
            return cart
        }
    } catch (error) {
        return (<> An Error has Occured! Please Try Again Later</>)
    }

}

export default Cart
