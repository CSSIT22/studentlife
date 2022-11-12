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
            <CouponDisplay></CouponDisplay>
        </ShopAppBody>
    )
}

export default Coupons
