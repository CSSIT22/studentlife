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
import { Shop_Cart, Shop_Coupon, User_Coupon_With_Detials } from "@apiType/shop"
import API from "src/function/API"

// Cart
const Cart = () => {
    const [cartProducts, setCartProducts] = useState<Shop_Cart[] | null>(null)

    const [couponCode, setCouponCode] = useState<string>("")
    const [couponDiscount, setCouponDiscount] = useState<number>(0)
    const [errorCouponMsg, setErrorMsg] = useState("Coupon is invalid!")
    const [userCoupons, setCoupons] = useState<User_Coupon_With_Detials[] | null>(null)
    const [isErrorCoupon, setErrorCoupon] = useState<boolean>(false)
    const [isCouponSuccess, setCouponSuccess] = useState<boolean>(false)

    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get("/shop/getAllProductsInCart")
    useEffect(() => {
        getData.then((res) => { setCartProducts(res.data) }).catch((err) => on()).finally(() => off())
        API.get("/shop/getAllUserCoupons").then(res => setCoupons(res.data)).catch(err => console.log(err))
        clearCoupon()
    }, [])
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

    const checkProductInCart = (productId: number): boolean => {
        if (cartProducts != null) {
            for (let i = 0; i < cartProducts?.length; i++) {
                if (cartProducts[i].productId == productId) {
                    return true
                }
            }
            return false
        } else {
            return false
        }

    }

    const applyCoupon = () => {
        if (userCoupons != null && userCoupons.length > 0) {
            for (let i = 0; i < userCoupons.length; i++) {
                if (userCoupons[i].couponCode.toLowerCase() == couponCode.toLowerCase()) {
                    if (userCoupons[i].coupon.quota > 0) {
                        let expDate = new Date(userCoupons[i].coupon.validTill.toString())
                        let now = new Date()
                        if (now < expDate) {
                            if (parseFloat(userCoupons[i].coupon.minimumSpend) <= summeryData.total) {
                                if (checkProductInCart(userCoupons[i].coupon.productId)) {
                                    couponSuccess(parseFloat(userCoupons[i].coupon.discount))
                                    return
                                }
                                setErrorCoupon(true)
                                setErrorMsg("Please put the required product in your cart before proceeding!")
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCouponCode(e.target.value)
    }
    const removeFromCart = (productId: number) => {
        // Remove the item from the array of cart items
        if (cartProducts) {
            const updatedCartItems = cartProducts.filter(cp => cp.productId !== productId);
            // Update the state with the new array
            setCartProducts(updatedCartItems);
            clearCoupon()
            // Send a DELETE request to the backend to remove the item from the database
            API.delete("/shop/deleteCartProduct/" + productId).then(res => console.log(res.data)).catch((err) => alert("There was an error connecting with database. Please Reload the webpage!"))
        }
    }
    const increaseQty = (productId: number) => {
        if (cartProducts) {
            // Find the item in the array of cart items
            const item = cartProducts.find(item => item.productId === productId);
            if (item) {
                let newQuantity = item.quantity + 1
                // Check with stock
                if (newQuantity <= item.product.productStock) {
                    // Update the quantity of the item
                    item.quantity = newQuantity
                    // Update the state with the new array
                    setCartProducts([...cartProducts]);
                    clearCoupon()
                    API.put("/shop/incrementCPQuantity/" + productId).catch(() => alert("Cannot Update the database please reload the page"))
                }
            }
        }
    }
    const decreaseQty = (productId: number) => {
        if (cartProducts) {
            // Find the item in the array of cart items
            const item = cartProducts.find(item => item.productId === productId);
            if (item) {
                let newQuantity = item.quantity - 1
                // Check with stock
                if (newQuantity > 0) {
                    // Update the quantity of the item
                    item.quantity = newQuantity
                    // Update the state with the new array
                    setCartProducts([...cartProducts]);
                    clearCoupon()
                    API.put("/shop/decreaseCPQuantity/" + productId).catch(() => alert("Cannot Update the database please reload the page"))
                }
            }
        }
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
                {!isCouponSuccess && <Flex gap={2} justify="space-between">
                    <Input
                        type="text"
                        placeholder="Enter Coupon Code"
                        shadow="md"
                        border="1px solid #CBD5E0"
                        borderRadius="10px"
                        size={"md"}
                        background="white"
                        value={couponCode}
                        onChange={handleChange}
                    ></Input>
                    <ThemedButton maxW="24" onClick={applyCoupon}> APPLY </ThemedButton>
                </Flex>}
                {isCouponSuccess && <Flex gap={2} justify="space-between">
                    <Text>Coupon Discount</Text>
                    <Text as="b">{convertCurrency(couponDiscount)}</Text>
                </Flex>}
                {isErrorCoupon && <Text sx={errorText}>{errorCouponMsg}</Text>}
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
                        <Link to="../shop/checkout" state={{ couponDiscount: couponDiscount, couponCode: couponCode }}>
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
                        {isError ? <>There Was an Error</> : isLoading ? <Spinner /> : generateCartProducts(cartProducts, removeFromCart, increaseQty, decreaseQty)}
                    </Flex>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    {orderSummary}
                </GridItem>
            </Grid>

        </ShopAppBody>
    )
}

function generateCartProducts(cartProducts: Shop_Cart[] | null, removeFromCart: (productId: number) => void, increaseQty: (productId: number) => void, decreaseQty: (productId: number) => void) {
    try {
        if (cartProducts != null && cartProducts.length > 0) {
            return cartProducts.map((cartProduct, key) => (
                <CartProduct
                    key={key}
                    productId={cartProduct.productId}
                    quantity={cartProduct.quantity}
                    images={cartProduct.product.images}
                    productName={cartProduct.product.productName}
                    productPrice={parseFloat(cartProduct.product.productPrice)}
                    productStock={cartProduct.product.productStock}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    onDelete={removeFromCart}
                />
            ))
        }
    } catch (error) {
        return (<> An Error has Occured! Please Try Again Later</>)
    }

}

export default Cart
