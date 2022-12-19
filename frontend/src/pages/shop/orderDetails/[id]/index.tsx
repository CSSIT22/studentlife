import { Shop_OrderInformation, Shop_Order_Details_Show } from '@apiType/shop'
import { Box, Flex, Heading, Input, Text, Toast, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { setDataAPI } from 'src/components/shop/functions/usefulFunctions'
import OrderItems from 'src/components/shop/orders/OrderItems'
import ShopAppBody from 'src/components/shop/ShopAppBody'
import ThemedButton from 'src/components/shop/ThemedButton'
import TitleBox from 'src/components/shop/TItleBox'
import { authContext } from 'src/context/AuthContext'
import API from 'src/function/API'

const OrderDetails = () => {
    const user = useContext(authContext)
    const param = useParams()
    const search = useLocation().search
    let userId = user.userId
    const loaction = useLocation()
    const [orderInformation, setOrderInformation] = useState<Shop_Order_Details_Show | null>(null)
    const [orderStaus, setOrderStatus] = useState<string>("")
    const toast = useToast()
    let isAuthorized = false
    let sellerUserId = new URLSearchParams(search).get('sellerUserIds')?.split(',')
    const orderId = param.id 
    const completed = setDataAPI('/shop/getOrderInformation/' + orderId, setOrderInformation)
    if (completed!= true){return completed}
    
    const placeUserId = orderInformation?.userId
    if (sellerUserId != undefined && sellerUserId.includes(userId)) {
        isAuthorized = true
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setOrderStatus(value)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        API.put('/shop/setOrderStatus', {
            orderId: orderId,
            orderStatus: orderStaus
        }).then(res => toast({
            status: "success",
            title: "Changed Successfully! Reload to see changed on the order",
            isClosable: true,
            duration: 1800,
        })).catch((error) => toast({
            status: "error",
            title: "Could not change!",
            isClosable: true,
            duration: 900,
        }))
        
    }

    if (isAuthorized == true) {
        return <ShopAppBody>
            <TitleBox title={"Order Placed by userId: " + placeUserId} />
            <Box p="10"></Box>
            {orderInformation && <OrderItems orderDetails={orderInformation} defaultCollapse={false} />}
            <Box p="10"></Box>
            <form>
                <Flex gap="3" wrap="wrap">
                    <Text bg="white" p="3" borderRadius={"xl"}>Set Order Status: </Text>
                    <Input type="text" bg="white" placeholder={"Order Status"} value={orderStaus} onChange={handleChange}></Input>
                    <ThemedButton onClick={handleSubmit}>Change</ThemedButton>
                </Flex>
            </form>
        </ShopAppBody>
    }
    else {
        return <Heading>You are not Authorized</Heading>
    }
}

export default OrderDetails