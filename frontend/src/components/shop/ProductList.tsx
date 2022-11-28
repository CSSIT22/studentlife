import React, { FC, useState } from "react"
import { Flex } from "@chakra-ui/react"
import ProductDisplay from "./ProductDisplay"

// Get data from database
const ProductList: FC<{
    products: {
        productId: number
        name: string
        image: string
        brand: string
        price: number
        categoryId: number
        contactId: number
        description: string
        color: string
        size: string
        stock: number
        deliveryFee: number
    }[]
    repeat?: boolean
}> = ({ products, repeat }) => {
    if (repeat == undefined) {
        repeat = true
    }

    return (
        <Flex justify="center" pt="3" wrap="wrap" gap="1rem">
            {generateProducts(products, repeat)}
        </Flex>
    )
}

export default ProductList
function generateProducts(
    products: {
        productId: number
        name: string
        image: string
        brand: string
        price: number
        categoryId: number
        contactId: number
        description: string
        color: string
        size: string
        stock: number
        deliveryFee: number
    }[],
    repeat: boolean
) {
    let dummyData = []
    const dummy = products.map((product) => {
        return (
            <ProductDisplay
                id={product.productId}
                name={product.name}
                image={product.image}
                brandName={product.brand}
                price={product.price}
            ></ProductDisplay>
        )
    })
    if (repeat) {
        for (let i = 0; i < 25; i++) {
            dummyData.push(dummy)
        }
    } else {
        dummyData.push(dummy)
    }
    return dummyData
}
