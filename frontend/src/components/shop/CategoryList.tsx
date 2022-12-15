import {Shop_Categories } from "@apiType/shop"
import { Flex} from "@chakra-ui/react"
import { useState } from "react"
import { CategoryItem } from "./CategoryItem"
import { setDataAPI } from "./functions/usefulFunctions"
// Get info from database
const CategoryList = () => { 
    const [categoryList, setCategoryList] = useState<null | Shop_Categories[]>(null)
    let completed = setDataAPI("shop/getAllCategories", setCategoryList)
    if (completed != true) {return completed}
    return (
        <Flex justify="center" align="center" p="2" wrap="wrap" gap="1rem">
            {generateCategories(categoryList)}
        </Flex>
    )
}
function generateCategories(categoryList: Shop_Categories[] | null) {
    if (categoryList != null){
    let dummy = categoryList.map((category) => {
        return <CategoryItem id={category.categoryId} name={category.categoryName} image={category.image}></CategoryItem>
    })
    return dummy}
}
//testing
export default CategoryList
