import React from 'react'
import { useLocation } from 'react-router-dom'
import PageTitle from 'src/components/shop/PageTitle'
import ShippingAddress from 'src/components/shop/ShippingAddress'
import ShopAppBody from 'src/components/shop/ShopAppBody'
import TitleBox from 'src/components/shop/TItleBox'

const Checkout = () => {
    const location = useLocation()
    const couponDiscount = location.state.couponDiscount
    return (
        <ShopAppBody>
            <PageTitle title="Checkout" />
            <TitleBox title="Shipping Address" />
            <ShippingAddress couponDiscount=  {couponDiscount}/>
        </ShopAppBody>
    )
}

export default Checkout
