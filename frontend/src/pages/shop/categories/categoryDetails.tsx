import React from "react"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import { Center, Text } from "@chakra-ui/react"
import ProductList from "../../../components/shop/ProductList"
const categoryDetails = () => {
    return (
        <ShopAppBody>
            <PageTitle p="1" title="Category: {selected category}" />
            <Center><Text>xxx Items Found in this category</Text></Center>
            <ProductList />
        </ShopAppBody>
    )
}

export default categoryDetails
