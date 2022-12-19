import React, { useContext, useEffect, useState } from 'react'
import { Button, Flex, Text, GridItem, Checkbox, Grid, useBoolean } from "@chakra-ui/react"
import ShopAppBody from '../../../components/shop/ShopAppBody';
import TitleBox from '../../../components/shop/TItleBox'
import PageTitle from '../../../components/shop/PageTitle'
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
import OrderConfirmProduct from '../../../components/shop/orders/OrderConfirmProduct';
import { DeleteIcon } from "@chakra-ui/icons"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ContentBox from "../../../components/shop/ContentBox"
import ThemedButton from "../../../components/shop/ThemedButton"
import { Shop_Cart, Shop_OrderInformation, Shop_Order_Noti } from '@apiType/shop';
import API from 'src/function/API';
import { authContext } from 'src/context/AuthContext';
const ConfirmOrder = () => {
    const [cartProducts, setCartProducts] = useState<Shop_Cart[] | null>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const user = useContext(authContext)
    const userName = user.fName +" " + user.lName
    const navigate = useNavigate()
    const location = useLocation()
    const couponDiscount = location.state.couponDiscount
    const couponCode = location.state.couponCode

    const add = location.state.add

    const getData = API.get("/shop/getAllProductsInCart")
    useEffect(() => {
        getData.then((res) => { setCartProducts(res.data) }).catch((err) => on()).finally(() => off())
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

    const shippingAddress = (
        <ContentBox bg='#fff'>
            <Flex direction='column' gap={5} p="5">
                <Text fontSize="md" fontWeight="700">Shipping Address</Text>
                <Text>{add}</Text>
            </Flex>
        </ContentBox>
    )

    const handleOrder = () => {
        const navToTransaction = (data: Shop_Order_Noti) => {
            let receiveUserId: string[] = ["9kcmTSjNL2AgGh7b3h7FI", "y8oicpxVvhSWTuFDIC_xE", "TT2ViedZgrmwLwTwTn9Bm"]
            data.products?.forEach((product) => product.product.contactTo.userId && receiveUserId.indexOf(product.product.contactTo.userId) === -1 ? receiveUserId.push(product.product.contactTo.userId) : null)
            console.log(receiveUserId)
            API.post("/notification/addnotiobject",{
                "template": "SHOP_PLACED_ORDER",
                "value":[userName, data.orderId],
                "userId": receiveUserId, 
                "module": "SHOP",
                "url":"/shop/orderDetails/" + data.orderId + "?sellerUserIds=" + receiveUserId,
                "sender": user.userId
            }).catch(err => console.log(err))
            navigate('../transaction/shoptransaction', { state: { orderId: data.orderId, tranactionId: data.transId } })
        }
        if (couponCode && couponCode != "") {
            API.post('/shop/postUserOrder', { couponCode: couponCode, totalPrice: summeryData.total, totalDeliveryFees: summeryData.deliveryTotal, shipping: add, orderPlaced: new Date(), orderStatus: "Processing Transaction" }).then((res) => navToTransaction(res.data as Shop_Order_Noti)).catch((err) => console.log(err))
        } else {
            API.post('/shop/postUserOrder', { totalPrice: summeryData.total, totalDeliveryFees: summeryData.deliveryTotal, shipping: add, orderPlaced: new Date(), orderStatus: "Processing Transaction" }).then((res) => navToTransaction(res.data as Shop_Order_Noti)).catch((err) => console.log(err))
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
                <Flex gap={2} justify="space-between">
                    <Text>Coupon Discount</Text>
                    <Text as="b">{convertCurrency(couponDiscount)}</Text>
                </Flex>
                <Flex gap={2} justify="space-between">
                    <Text>Total</Text>
                    <Text as="b">{convertCurrency(summeryData.total)}</Text>
                </Flex>
                <Flex justify="center" >
                    <ThemedButton onClick={handleOrder}>PAY NOW</ThemedButton>
                </Flex>
            </Flex>

        </ContentBox>
    )

    return (
        <ShopAppBody>
            <PageTitle title="Confirm Order" />
            <Grid templateColumns="3fr 2fr" gap={5}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex direction="column" gap={2}>
                        <TitleBox title="Order Includes" />
                        <Grid bg='#fff' boxShadow='lg' borderRadius='lg'>
                            {generateCartProducts(cartProducts)}
                        </Grid>
                    </Flex>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex direction="column" gap={2}>
                        {shippingAddress}
                        {orderSummary}
                    </Flex>
                </GridItem>
            </Grid>
        </ShopAppBody>
    )
}
export function generateCartProducts(cartProducts: Shop_Cart[] | null) {
    if (cartProducts != null) {
        return cartProducts.map((product, key) => (
            <GridItem key={key} bg="" borderBottom="1px" pl='2'>
                <OrderConfirmProduct
                    id={product.productId}
                    name={product.product.productName}
                    price={parseFloat(product.product.productPrice)}
                    quantity={product.quantity}
                    image={product.product.images[0].image}
                ></OrderConfirmProduct>
            </GridItem>
        ))
    }

}

export default ConfirmOrder
