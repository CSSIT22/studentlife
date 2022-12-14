import { Shop_Coupon, User_Coupon_With_Detials } from "@apiType/shop"
import { Breadcrumb, Center, Container, Divider, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { setDataAPI } from "src/components/shop/functions/usefulFunctions"
import ProductCouponCollect from "src/components/shop/ProductCouponCollect"
import ProductCouponDisplay from "src/components/shop/ProductCouponDisplay"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import TitleBox from "../../../components/shop/TItleBox"
const AvailCoupons = () => {
    const [coupons, setCoupons] = useState<Shop_Coupon[] | null>(null)
    const complete = setDataAPI("shop/getAllCoupons", setCoupons)
    if (complete != true) { return <ShopAppBody>{complete}</ShopAppBody> }
    return (
        <ShopAppBody>
            <PageTitle title="All Coupons Available Right Now" />
            <Flex gap={5} direction="row" wrap={"wrap"}>
                {generateCoupons(coupons)}
            </Flex>
        </ShopAppBody>
    )
}

export default AvailCoupons
function generateCoupons(coupons: Shop_Coupon[] | null) {
    if (coupons != null && coupons.length > 0) {
        return coupons.map((coupon, key) => {
            let date = coupon.validTill.toString().split("T")[0]
            return (<div key={key}>
                <ProductCouponCollect
                    couponCode={coupon.couponCode}
                    discountAmount={parseFloat(coupon.discount)}
                    details={coupon.couponDesc}
                    minSpend={parseFloat(coupon.minimumSpend)}
                    validUntil={date + ""}
                    productId={coupon.productId}
                    image={coupon.product.images[0].image} /></div>)
        })
    } else {
        return "You don't have any coupons"
    }
}
