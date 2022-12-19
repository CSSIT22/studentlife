import ShopAppBody from "../../../components/shop/ShopAppBody"
import TitleBox from "../../../components/shop/TItleBox"
import OrderItems from "src/components/shop/orders/OrderItems"
import PageTitle from "src/components/shop/PageTitle"
import { dateFormat, setDataAPI } from "src/components/shop/functions/usefulFunctions"
import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Shop_Order, Shop_Order_Details_Show } from "@apiType/shop"
import API from "src/function/API"
const Orders = () => {
    const [orders, setOrders] = useState<Shop_Order_Details_Show[] | null>(null)
    const complete = setDataAPI('/shop/getAllOrders', setOrders)
    if (complete != true){return <ShopAppBody>{complete}</ShopAppBody>}
    return (
        <ShopAppBody>
            <PageTitle title="Orders" />
            <Flex direction="column" gap = {5}>
                <TitleBox title="Order History" ></TitleBox> 
                {generateOrders(orders)}
            </Flex>
        </ShopAppBody>
    )
}

function generateOrders(orders: Shop_Order_Details_Show[] | null) {
    if (orders != null){
        if (orders.length > 0){
            return orders.map((order, key) => {
                return <OrderItems key={key} orderDetails = {order} />
        })
        }
    }
}

export default Orders
