import { Breadcrumb, Center, Container, Divider, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import React from "react"
import Searchbar from "../../../components/shop/SearchBar"
import { CategoryItem } from "../../../components/shop/CategoryItem"
import ShopAppBody from "../../../components/shop/ShopAppBody"
const Categories = () => {
    return (
        <ShopAppBody>
            <Center p="3">
                {" "}
                <Text fontSize={"3xl"} fontWeight="bold">
                    {" "}
                    Categories
                </Text>{" "}
            </Center>
            <div>
                    <Flex justify="center" align="center" p="2" wrap="wrap" gap="1rem">
                        <CategoryItem
                            name="Laptops"
                            image="https://static.vecteezy.com/system/resources/previews/002/387/754/original/laptop-icon-free-vector.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptops"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopiiis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopiiis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopiiis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                        <CategoryItem
                            name="Laptopieeeeeis"
                            image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            link=""
                        ></CategoryItem>
                    </Flex>
            </div>
        </ShopAppBody>
    )
}

export default Categories
