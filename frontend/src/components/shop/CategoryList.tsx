import {Shop_Categories } from "@apiType/shop"
import { Flex} from "@chakra-ui/react"
import { useState } from "react"
import CategoryItem  from "./CategoryItem"
import { setDataAPI } from "./functions/usefulFunctions"

const CategoryList = () => { 

    const [categoryList, setCategoryList] = useState<null | Shop_Categories[]>(null)
    let completed = setDataAPI("shop/getAllCategories", setCategoryList)
    // Shows Error or Loading
    if (completed != true) {return completed} 

    return (
        <Flex justify="center" align="center" p="2" wrap="wrap" gap="1rem">
            {categoryList && generateCategories(categoryList)}
        </Flex>
    )
}

function generateCategories(categoryList: Shop_Categories[]) {
    try{
        return categoryList.map((category, key) => 
           <div key = {key}><CategoryItem id={category.categoryId} name={category.categoryName} image={category.image}></CategoryItem></div>
        )
    } catch(err){console.log(err)}
}
//testing
export default CategoryList
