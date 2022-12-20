import React, { FC } from "react"
import { Flex } from "@chakra-ui/react"
import ProductDisplay from "./ProductDisplay"
import { Shop_Product_With_Images } from "@apiType/shop"

type propsType = FC<{
    products: Shop_Product_With_Images[] | null
}>

const ProductList: propsType = ({ products }) => {
    return (
        <Flex justify="center" pt="3" wrap="wrap" gap="1rem">
            {products && generateProducts(products)}
        </Flex>
    )
}

function generateProducts(products: Shop_Product_With_Images[]) {
    try {
        return products.map((product, key) =>
            <div key={key}>
                <ProductDisplay
                    id={product.productId}
                    name={product.productName}
                    brandName={product.brandName}
                    price={parseFloat(product.productPrice)}
                    image={product.images[0]?.image}
                />
            </div>
        )
    } catch (error) {console.log(error)}
}

export default ProductList
