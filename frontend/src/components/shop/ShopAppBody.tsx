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
        // {
        //     name: "Recommended Items",
        //     to: "/shop/recommendation"
        // },
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
