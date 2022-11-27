import ShopAppBody from "../../../components/shop/ShopAppBody"
import TitleBox from "../../../components/shop/TItleBox"
import OrderItems from "src/components/shop/orders/OrderItems"
import PageTitle from "src/components/shop/PageTitle"
const Orders = () => {
    return (
        <ShopAppBody>
            <PageTitle title="Orders" />
            <TitleBox title="Recent"></TitleBox>
            {generateOrders()}

            {/* Past */}
            <TitleBox title="Past"></TitleBox>
            {generateOrders()}
        </ShopAppBody>
    )
}

function generateOrders() {
    let orders = [],
        today = new Date(),
        time =
            today.getHours() > 12 ? today.getHours() - 12 + ":" + today.getMinutes() + " AM" : today.getHours() + ":" + today.getMinutes() + +" PM",
        dateTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " at " + time

    for (let i = 0; i < 5; i++) {
        orders.push(<OrderItems orderNo="fsdedc442095" orderDateTime={dateTime} orderStatus="Out for delivery" />)
    }
    return orders
}

export default Orders
