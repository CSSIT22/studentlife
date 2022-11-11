import { Flex } from "@chakra-ui/react"
import { CategoryItem } from "./CategoryItem"

// Get info from database
const CategoryList = () => {
    return (
        <Flex justify="center" align="center" p="2" wrap="wrap" gap="1rem">
            {generateCategories()}
        </Flex>
    )
}
function generateCategories() {
    let cats = [];
    for (let i = 0; i < 50; i++){
        cats.push(<CategoryItem
            name="Laptops"
            image="https://static.vecteezy.com/system/resources/previews/002/387/754/original/laptop-icon-free-vector.jpg"
            link="/shop/categories/categoryDetails"
        ></CategoryItem>)
    }
    return cats
}

export default CategoryList


