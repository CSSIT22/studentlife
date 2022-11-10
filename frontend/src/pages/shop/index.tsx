import PageTitle from "../../components/shop/PageTitle"
import ProductList from "../../components/shop/ProductList"
import Searchbar from "../../components/shop/SearchBar"
import ShopAppBody from "../../components/shop/ShopAppBody"
const Shop = () => { 
    return (
        <ShopAppBody>
            <PageTitle title= "Explore" />
            <Searchbar></Searchbar>
            <ProductList />
        </ShopAppBody>
    )
}

export default Shop
