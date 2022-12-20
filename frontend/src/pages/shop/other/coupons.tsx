import { Shop_Coupon, User_Coupon_With_Detials } from "@apiType/shop"
import { Flex, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { setDataAPI } from "src/components/shop/functions/usefulFunctions"
import ProductCouponDisplay from "src/components/shop/ProductCouponDisplay"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
const Coupons = () => {
    const [coupons, setCoupons] = useState<User_Coupon_With_Detials[] | null>(null)
    const complete = setDataAPI("shop/getAllUserCoupons", setCoupons)
    if (complete != true) { return <ShopAppBody>{complete}</ShopAppBody> }
    return (
        <ShopAppBody>
            <PageTitle title="Your Coupons" />
            <Flex gap={5} direction="row" wrap={"wrap"}>
                {generateCoupons(coupons)}
            </Flex>
        </ShopAppBody>
    )
}

export default Coupons
function generateCoupons(coupons: User_Coupon_With_Detials[] | null) {
    if (coupons != null && coupons.length > 0) {
        return coupons.map((coupon, key) => {
            let date = coupon.coupon.validTill.toString().split("T")[0]
            return (<div key={key}>
                <ProductCouponDisplay
                    couponCode={coupon.couponCode}
                    discountAmount={parseFloat(coupon.coupon.discount)}
                    details={coupon.coupon.couponDesc}
                    minSpend={parseFloat(coupon.coupon.minimumSpend)}
                    validUntil={date + ""}
                    productId={coupon.coupon.productId}
                    image={coupon.coupon.product.images[0].image} /></div>)
        })
    } else {
        return "You don't have any coupons"
    }
}
