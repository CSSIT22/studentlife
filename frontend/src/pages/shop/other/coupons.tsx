import { Breadcrumb, Center, Container, Divider, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import React from "react"
import CouponDisplay from "../../../components/shop/CouponDisplay"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import TitleBox from "../../../components/shop/TItleBox"
const Coupons = () => {
    return (
        <ShopAppBody>
            <PageTitle title="Your Coupons" />
            <Flex gap={5} direction="column">
                {generateCoupons(7)}
            </Flex>
        </ShopAppBody>
    )
}

export default Coupons
function generateCoupons(n: number) {
    const coupons = []
    for (let i = 0; i < n; i++) {
        coupons.push(
            <CouponDisplay
                couponCode={"Free" + (i + 10)}
                discountAmount={50}
                details="Buy for 500 get 50 discount"
                validUntil="10/Sep/2023"
                minSpend={250}
            ></CouponDisplay>
        )
    }
    return coupons
}
