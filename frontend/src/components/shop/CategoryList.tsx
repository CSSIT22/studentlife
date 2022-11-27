import { Category } from "@apiType/shop"
import { Flex, Heading, useBoolean } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import API from "src/function/API"
import { CategoryItem } from "./CategoryItem"

// Get info from database
const CategoryList = () => {
    const [categoryList, setCategoryList] = useState<null | Category[]>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getAllCategories = API.get("/shop/getAllCategories")
    useEffect(() => {
        getAllCategories
            .then((res) => setCategoryList(res.data))
            .catch((err) => on())
            .finally(() => off())
    }, [])
    if (isError) {
        return <Heading>There is an Error! Please Try Again Later</Heading>
    }
    if (isLoading) {
        return <Heading>Loading...</Heading>
    }
    return (
        <Flex justify="center" align="center" p="2" wrap="wrap" gap="1rem">
            {generateCategories(categoryList)}
        </Flex>
    )
}
function generateCategories(categoryList: Category[] | null) {
    if (categoryList != null) {
        let dummy = categoryList.map((category) => {
            return <CategoryItem id={category.id} name={category.name} image={category.image}></CategoryItem>
        })
        return dummy
    }
}
//testing
export default CategoryList
