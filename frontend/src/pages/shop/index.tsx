import { useState } from "react"
import { products } from "src/components/shop/content/dummyData/products"
import PageTitle from "../../components/shop/PageTitle"
import ProductList from "../../components/shop/ProductList"
import Searchbar from "../../components/shop/SearchBar"
import ShopAppBody from "../../components/shop/ShopAppBody"
const Shop = () => { 
    const [prods, setprods] = useState(products)
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <ShopAppBody>
            <PageTitle title= "Explore" />
            <Searchbar productsIn={prods} setProducts={setprods} setSearchQuery={setSearchQuery} searchQuery={searchQuery}></Searchbar>
            <ProductList products= {prods}/>
        </ShopAppBody>
    )
}

export default Shop
