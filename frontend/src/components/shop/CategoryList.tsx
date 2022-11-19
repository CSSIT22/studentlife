import { Flex } from "@chakra-ui/react"
import { CategoryItem } from "./CategoryItem"
import { categories } from "./content/dummyData/categories"

// Get info from database
const CategoryList = () => {
    const categoriese = categories
    return (
        <Flex justify="center" align="center" p="2" wrap="wrap" gap="1rem">
            {generateCategories()}
        </Flex>
    )
}
function generateCategories() {
    let dummy = categories.map((category) => {
        return <CategoryItem id={category.id} name={category.name} image={category.image}></CategoryItem>
    })
    let cats = []
    for (let i = 0; i < 10; i++) {
        cats.push(dummy)
    }
    return cats
}

export default CategoryList
