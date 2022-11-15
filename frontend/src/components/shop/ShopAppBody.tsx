import React, { Component } from "react"
import AppBody from "../share/app/AppBody"

const ShopAppBody = (props: any) => {
    return <AppBody secondarynav={[
        {
            name: "Explore",
            to: "/shop"
        }
        // Need to add these without the problem of navbar alignment
        //,
        // {
        //     name: "Categories",
        //     to: "/shop/categories"
        // },
        // {
        //     name: "Recommended Items",
        //     to: "/shop/recommendation"
        // },
        // {
        //     name: "Cart",
        //     to: "/shop/cart"
        // }
    ]
    }> 
        {props.children}
    </AppBody>
}

export default ShopAppBody
