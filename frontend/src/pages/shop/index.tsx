import { useState } from "react"
import PageTitle from "../../components/shop/PageTitle"
import ProductList from "../../components/shop/ProductList"
import Searchbar from "../../components/shop/SearchBar"
import ShopAppBody from "../../components/shop/ShopAppBody"
import { Shop_Product_With_Images } from "@apiType/shop"
import { setDataAPI } from "src/components/shop/functions/usefulFunctions"

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState("")
    // Getting Product List
    const [productList, setProductList] = useState<Shop_Product_With_Images[] | null>(null)
    let completed = setDataAPI("shop/getAllProducts", setProductList)
    // If there is any error or Loading
    if (completed != true) return <ShopAppBody>{completed}</ShopAppBody>

    return (
        <ShopAppBody>
            <PageTitle title="Explore" />
            <Searchbar setProducts={setProductList} setSearchQuery={setSearchQuery} searchQuery={searchQuery}></Searchbar>
            <ProductList products={productList} />
        </ShopAppBody>
    )
}

export default Shop
