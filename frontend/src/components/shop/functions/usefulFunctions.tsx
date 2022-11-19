import { GridItem } from '@chakra-ui/react'
import OrderedProductDisplay from '../orders/OrderedProductDisplay'

function convertCurrency(amount: number) {
    return "฿" + amount.toFixed(2)
}
export function generateProducts() {
    let products = []
    for (let i = 0; i < 3; i++) {
        products.push(
            <GridItem bg="" borderBottom="1px">
                <OrderedProductDisplay
                id = {1}
                name="Pen"
                price={10000}
                quantity={2}
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                link="/shop/product/productDetail"
            ></OrderedProductDisplay>
            </GridItem>
        )
    }
    return products
}
export default convertCurrency