import React from 'react'
import PageTitle from 'src/components/shop/PageTitle'
import ShippingAddress from 'src/components/shop/ShippingAddress'
import ShopAppBody from 'src/components/shop/ShopAppBody'
import TitleBox from 'src/components/shop/TItleBox'

const Checkout = () => {
    return (
        <ShopAppBody>
            <PageTitle title="Checkout" />
            <TitleBox title="Shipping Address" />
            <ShippingAddress />
        </ShopAppBody>
    )
}

export default Checkout
