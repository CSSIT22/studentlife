import { Flex, Text, Box, Grid, SimpleGrid, useBoolean } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import Details from "./Detials"
import { dateFormat } from "../functions/usefulFunctions"
import ContentBox from "../ContentBox"
import OrderedProductDisplay from "./OrderedProductDisplay"
import {Shop_Order_Details_Show, Shop_Product_With_Images } from "@apiType/shop"
import API from "src/function/API"

const OrderItems: FC<{
    orderDetails: Shop_Order_Details_Show
    defaultCollapse?: boolean
}> = ({orderDetails, defaultCollapse}) => {
    const [couponDiscount, setCouponDiscount] = useState<string | null>(null)
    useEffect(() => {
      API.get("/shop/getCouponInformation/" + orderDetails.couponCode).then((res) => {
        setCouponDiscount(res.data.discount)
      }).catch((error) => console.log(error))
    }, [])
    const [isCollapse, { on, off }] = useBoolean(defaultCollapse != undefined ? defaultCollapse : true)
    let orderNo = orderDetails.orderId
    // TODO: Get Order Info from backend
    let orderStatus = orderDetails.orderStatus
    let orderDateTime = dateFormat(new Date(orderDetails.orderPlaced))

    // Style Text
    const detailText = {
        fontSize: "md",
        fontWeight: "500"
    }

    // Components
    const orderSummary = (
        <Flex p="4" wrap="wrap" justify="space-between" gap={5} onClick={isCollapse ? off : on} cursor= "pointer">
            <Text sx={detailText}>{"#" + orderNo}</Text>
            <Text sx={detailText}>{orderDateTime}</Text>
            <Text sx={detailText}>{orderStatus}</Text>
        </Flex>
    )
    const divide = <Box h="min" w="full" bg="black" p="0.3"></Box>
    const productsComp = (
        <SimpleGrid columns={{ base: 1, md: 2 }} p={{ base: 3, sm: 7 }} gap={4}>
            {generateProducts(orderDetails)}
        </SimpleGrid>
    )
    return (
        <ContentBox bg="#FFFFFF">
            {orderSummary}
            {isCollapse ? <>
            </> : <>
            {divide}
                {productsComp}
                {divide}
                <Details
                    totalPrice={parseFloat(orderDetails.totalPrice)}
                    subtotal={parseFloat(orderDetails.totalPrice) - parseFloat(orderDetails.totalDeliveryFees)}
                    deliveryFee={parseFloat(orderDetails.totalDeliveryFees)}
                    couponDiscount={couponDiscount? parseFloat(couponDiscount) : null}
                    address={orderDetails.shipping}
                    paymentMethod={"QR Code"}
                />
            </>}

        </ContentBox>
    )
}

function generateProducts(orderDetails: Shop_Order_Details_Show) {
    let products = orderDetails.products
    try {
        if (products.length > 0){
            return products.map((product, key) => (
                <OrderedProductDisplay key= {key} productId={product.productId} name={product.product.productName} price={parseFloat(product.product.productPrice)} quantity={product.quantity} image={product.product.images[0].image} />
            ))
        }
    } catch (error) {
    }
}

export default OrderItems
