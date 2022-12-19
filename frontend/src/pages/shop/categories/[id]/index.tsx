import { Shop_Product_With_Images } from '@apiType/shop'
import { Center, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { setDataAPI } from 'src/components/shop/functions/usefulFunctions'
import PageTitle from 'src/components/shop/PageTitle'
import ProductList from 'src/components/shop/ProductList'
import ShopAppBody from 'src/components/shop/ShopAppBody'
import API from 'src/function/API'

const index = () => {
    const param = useParams()

    const category_name = useLocation().state.catName
    const str = "Category: " + category_name
    
    const [productList, setProductList] = useState<Shop_Product_With_Images[] | null>(null)
    let completed = setDataAPI("/shop/getAllProductsInCategory/" + param.id, setProductList)
    if (completed!= true) {return <ShopAppBody>{completed}</ShopAppBody>}
    
    return (
        <ShopAppBody>
            <PageTitle p="1" title={ str} />
            <Center><Text>{productList != null ? productList.length: "No"} Item(s) Found in this category </Text></Center>
            <ProductList products={productList} />
        </ShopAppBody>
    )
}

export default index
