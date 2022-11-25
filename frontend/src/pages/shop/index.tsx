import { useEffect, useState } from "react"
import API from "src/function/API"
import PageTitle from "../../components/shop/PageTitle"
import ProductList from "../../components/shop/ProductList"
import Searchbar from "../../components/shop/SearchBar"
import ShopAppBody from "../../components/shop/ShopAppBody"
import { Product } from "@apiType/shop"
import { Heading, useBoolean } from "@chakra-ui/react"
const Shop = () => {
    const [productList, setProductList] = useState<any>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getAllProducts = API.get("/shop/getAllProducts")
    const [searchQuery, setSearchQuery] = useState("")
    useEffect(() => {
        getAllProducts
            .then((res) => setProductList(res.data))
            .catch((err) => on())
            .finally(() => off())
    }, [])
    if (isError) {
        return (
            <ShopAppBody>
                <Heading>There is an Error! Please Try Again Later</Heading>
            </ShopAppBody>
        )
    }
    if (isLoading) {
        return (
            <ShopAppBody>
                <Heading>Loading...</Heading>
            </ShopAppBody>
        )
    }

    return (
        <ShopAppBody>
            <PageTitle title="Explore" />
            <Searchbar productsIn={productList} setProducts={setProductList} setSearchQuery={setSearchQuery} searchQuery={searchQuery}></Searchbar>
            <ProductList products={productList} repeat={false} />
        </ShopAppBody>
    )
}

export default Shop
