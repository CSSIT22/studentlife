import React from "react"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import { Center, Text } from "@chakra-ui/react"
import ProductList from "../../../components/shop/ProductList"
import { useLocation } from "react-router-dom"
import { products } from "src/components/shop/content/dummyData/products"
const categoryDetails = () => {
    const location = useLocation()
    const category_id = location.state.cat_id
    const category_name = location.state.cat_name
    const str = "Category: " + category_name
    // Need to get number of products in the category

    const filtered_products = products.filter((prod) => prod.categoryId === category_id)
    const numProducts = filtered_products.length
    return (
        <ShopAppBody>
            <PageTitle p="1" title={ str} />
            <Center><Text>{numProducts} Item(s) Found in this category </Text></Center>
            <ProductList products={filtered_products} repeat = {false}/>
        </ShopAppBody>
    )
}

export default categoryDetails
