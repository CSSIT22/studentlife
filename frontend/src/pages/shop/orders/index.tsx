import ShopAppBody from "../../../components/shop/ShopAppBody"
import TitleBox from "../../../components/shop/TItleBox"
import OrderItems from "src/components/shop/orders/OrderItems"
import PageTitle from "src/components/shop/PageTitle"
import { dateFormat } from "src/components/shop/functions/usefulFunctions"
import { Flex } from "@chakra-ui/react"
const Orders = () => {
    return (
        <ShopAppBody>
            <PageTitle title="Orders" />
            <Flex direction="column" gap = {5}>
            {/* Recent */}
            <TitleBox title="Recent" ></TitleBox> 
            {generateOrders(3)}
            {/* Past */}
            <TitleBox title="Past"></TitleBox>
            {generateOrders(2)}
            </Flex>
        </ShopAppBody>
    )
}

function generateOrders(count: number) {
    let orders = []
    for (let i = 0; i < count; i++) {
        orders.push(<OrderItems orderNo= {i+1}/>)
    }
    return orders
}

export default Orders
