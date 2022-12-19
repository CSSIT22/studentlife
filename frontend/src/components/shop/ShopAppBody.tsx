import React, { Component } from "react"
import AppBody from "../share/app/AppBody"
import { FiShoppingCart } from "react-icons/fi"

const ShopAppBody = (props: any) => {
    return <AppBody secondarynav={[
        {
            name: "Explore",
            to: "/shop"
        },
        {
            name: "Categories",
            to: "/shop/categories"
        },
        {
            name: "Contact Us To Sell",
            to: "/shop/other/contact_us"
        },
        {
            name: "Order History",
            to: "/shop/orders"
        },
        {
            name: "Your Coupons",
            to: "/shop/other/coupons"
        },
        {
            name: "Available Coupons",
            to: "/shop/other/availCoupons"
        },
        {
            name: "",
            to: "/shop/cart",
            Icon: FiShoppingCart,
            isRight: true
        }
    ]
    }>
        {props.children}
    </AppBody>
}

export default ShopAppBody
