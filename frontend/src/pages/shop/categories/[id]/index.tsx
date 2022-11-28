import { Center, useBoolean, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import PageTitle from "src/components/shop/PageTitle"
import ProductList from "src/components/shop/ProductList"
import ShopAppBody from "src/components/shop/ShopAppBody"
import API from "src/function/API"

const index = () => {
    const param = useParams()
    const [productList, setProductList] = useState<any>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getAllProductsInCategory = API.get("/shop/getAllProductsInCategory/" + param.id)
    useEffect(() => {
        getAllProductsInCategory
            .then((res) => setProductList(res.data))
            .catch((err) => on())
            .finally(() => off())
    }, [])
    if (isLoading) {
        return <>Loading</>
    }
    if (isError) {
        return <>There is an Error</>
    }
    const location = useLocation()
    const category_name = location.state.cat_name
    const str = "Category: " + category_name
    const numProducts = productList.length
    return (
        <ShopAppBody>
            <PageTitle p="1" title={str} />
            <Center>
                <Text>{numProducts} Item(s) Found in this category </Text>
            </Center>
            <ProductList products={productList} repeat={false} />
        </ShopAppBody>
    )
}

export default index
