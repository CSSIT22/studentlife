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
            <TitleBox title="Recent"></TitleBox> 
            {generateOrders()}
            {/* Past */}
            <TitleBox title="Past"></TitleBox>
            {generateOrders()}
            </Flex>
        </ShopAppBody>
    )
}

function generateOrders() {
    let orders = []
    for (let i = 0; i < 5; i++) {
        orders.push(<OrderItems orderNo= {5}/>)
    }
    return orders
}

export default Orders
