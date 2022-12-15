import { Shop_Coupon } from "@apiType/shop"
import { Breadcrumb, Center, Container, Divider, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { setDataAPI } from "src/components/shop/functions/usefulFunctions"
import CouponDisplay from "../../../components/shop/CouponDisplay"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import TitleBox from "../../../components/shop/TItleBox"
const Coupons = () => {
    const [coupons, setCoupons] = useState<Shop_Coupon[] | null>(null)
    const complete = setDataAPI("shop/getAllCoupons", setCoupons)
    if (complete != true) { return <ShopAppBody>{complete}</ShopAppBody> }
    return (
        <ShopAppBody>
            <PageTitle title="Your Coupons" />
            <Flex gap={5} direction="column">
                {generateCoupons(coupons)}
            </Flex>
        </ShopAppBody>
    )
}

export default Coupons
function generateCoupons(coupons: Shop_Coupon[] | null) {
    if (coupons != null && coupons.length > 0) {
        const data = []
        let date = coupons[0].validTill.toString().split("T")[0]
        for (let i = 0; i < coupons.length; i++) {
            data.push(
                <CouponDisplay
                    couponCode={coupons[i].couponCode}
                    discountAmount={parseFloat(coupons[i].discount)}
                    details={coupons[i].couponDesc}
                    validUntil={date + ""}
                    minSpend={parseFloat(coupons[i].minimumSpend)}
                ></CouponDisplay>
            )
        }
        return data
    } else {
        return "You don't have any coupons"
    }
}
