import React from "react"
import { Flex } from "@chakra-ui/react"
import ProductDisplay from "./ProductDisplay"

// Get data from database
const ProductList = () => {
    return (
        <Flex justify="center" pt="3" wrap="wrap" gap="1rem">
            {generateProducts()}
        </Flex>
    )
}

export default ProductList
function generateProducts() {
    let products = []
    for (let i = 0; i < 25; i++) {
        products.push(
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price={10000}
                link="/shop/product/productDetail"
            ></ProductDisplay>
        )
    }
    return products
}
