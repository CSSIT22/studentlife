import React from "react"
import { Flex } from "@chakra-ui/react"
import ProductDisplay from "./ProductDisplay"

// Get data from database
const ProductList = () => {
    return (
        <Flex justify="center" pt="3" wrap="wrap" gap="1rem">
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>
            <ProductDisplay
                name="Pen"
                image="https://cdn.shopify.com/s/files/1/0070/7032/files/shopify-product-sourcing.jpg?v=1598457732"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>{" "}
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>{" "}
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>{" "}
            <ProductDisplay
                name="Pen"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                brandName="Nike"
                price="10000"
                link=""
            ></ProductDisplay>
        </Flex>
    )
}

export default ProductList
