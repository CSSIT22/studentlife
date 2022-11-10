import { Box, Center, Flex, GridItem, Input, InputGroup, InputLeftElement, Select, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import { TfiSearch } from "react-icons/tfi"
const Searchbar = () => {
    return (
        <Center>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <InputGroup width={"10ram"} mr="2">
                    <InputLeftElement children={<TfiSearch />} pb={1} />
                    <Input placeholder="Search" borderRadius={"6"}  />
                </InputGroup>
            </Flex>

            <Select placeholder="5Km" size="sm" borderRadius={"3xl"} width={"100px"}>
                <option value="option1">2 Km</option>
                <option value="option2">4 Km</option>
                <option value="option3">5 Km</option>
            </Select>
        </Center>
    )
}

export default Searchbar
