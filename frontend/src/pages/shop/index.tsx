import { Flex, Text } from "@chakra-ui/react"
import React from "react"
import { CategoryItem } from "../../components/shop/CategoryItem"
import ProductDisplay from "../../components/shop/ProductDisplay"
import Searchbar from "../../components/shop/SearchBar"
import ShopAppBody from "../../components/shop/ShopAppBody"
const Shop = () => {
    return (
        <ShopAppBody>
            <Flex justify="space-around" align="center" gap ="1" direction="column">
            <Text fontSize={"3xl"} fontWeight="bold"> Explore</Text>{" "}
            <Searchbar></Searchbar>
            </Flex>
                
            <div>
                <Flex justify="center" pt="3" wrap="wrap" gap="1rem">
                    <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay>
                    <ProductDisplay name="Pen" image ="https://cdn.shopify.com/s/files/1/0070/7032/files/shopify-product-sourcing.jpg?v=1598457732" brandName= "Nike" price="10000" link =""></ProductDisplay>
                    <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay>
                    <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay>
                    <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay>
                    <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay>
                    <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay> <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay>  <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay> <ProductDisplay name="Pen" image ="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" brandName= "Nike" price="10000" link =""></ProductDisplay>
                </Flex>
            </div>
        </ShopAppBody>
    )
}

export default Shop
