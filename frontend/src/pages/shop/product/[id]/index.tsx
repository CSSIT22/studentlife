import { useEffect, useState } from "react"
import API from "src/function/API"

import { Shop_Product } from "@apiType/shop"
import { useParams } from "react-router-dom"
import PageTitle from "src/components/shop/PageTitle"
import ShopAppBody from "src/components/shop/ShopAppBody"
import { Box, Flex, useBoolean} from "@chakra-ui/react"
import LoadingDisplay from "src/components/shop/LoadingDisplay"
import ProductBox from "src/components/shop/ProductBox"
import ProductDetailsBox from "src/components/shop/ProductDetailsBox"
import ReviewBox from "src/components/shop/ReviewBox"
import ContactBox from "src/components/shop/ContactBox"

const index = () => {
    const param = useParams()

    const [product, setProduct] = useState<Shop_Product | null>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    const getProductInfo = API.get("/shop/getProductInformation/" + param.id)

    useEffect(() => {
        getProductInfo.then((res) => { setProduct(res.data) }).catch((err) => on()).finally(() => { off() })
    }, [])

    if (isLoading) {
        return <LoadingDisplay />
    }
    if (isError || product == null) {
        return (<>
            There is an Error
        </>)
    }

    // Need to calculate overall rating
    let oRating: string | number = " No Rating Yet"
    try {
        if (product.userReview != null && product.userReview.length > 0) {
            oRating = calculateAvgReview(product.userReview)
        }
    } catch (e) {}

    return (
        <ShopAppBody>
            <PageTitle title="Product Details" />
            <Flex direction="column" gap={6}>
                <ProductBox product={product} oRating={oRating} />
                <ProductDetailsBox product={product} oRating={oRating} />
                <ReviewBox product={product} reviews={product.userReview}/>
                <ContactBox product={product}/>
            </Flex>
            <Box p="8"></Box>
        </ShopAppBody>
    )
}
function calculateAvgReview(reviews: any) {
    let oRating = 0
    for (let i = 0; i < reviews.length; i++) {
        oRating += reviews[i].reviewRating
    }
    return (oRating / reviews.length).toFixed(2)
}
export default index


