import React, { FC, useState } from "react"
import { Flex, useBoolean } from "@chakra-ui/react"
import ProductDisplay from "./ProductDisplay"
import { Shop_Product, Shop_Product_Images, Shop_Product_With_Images } from "@apiType/shop"
import { setDataAPI } from "./functions/usefulFunctions"

// Get data from database
const ProductList: FC<{
    products: Shop_Product_With_Images[] | null
    repeat?: boolean
}> = ({ products }) => {
    return (
        <Flex justify="center" pt="3" wrap="wrap" gap="1rem">
            {generateProducts(products)}
        </Flex>
    )
}
function generateProducts(products: Shop_Product_With_Images[] | null) {
    try {
        if (products != null) {
            let dummyData = []
            const dummy = products.map((product) => {
                if (product.images.length > 0) {
                    return (<ProductDisplay
                        id={product.productId}
                        name={product.productName}
                        brandName={product.brandName}
                        price={parseFloat(product.productPrice)}
                        image={product.images[0].image}
                    ></ProductDisplay>)
                } else {
                    return (<ProductDisplay
                        id={product.productId}
                        name={product.productName}
                        brandName={product.brandName}
                        price={parseFloat(product.productPrice)}
                    ></ProductDisplay>)
                }
            })
            dummyData.push(dummy)

            return dummyData
        }
    } catch (error) {
        console.log(error)
    }
}

export default ProductList

