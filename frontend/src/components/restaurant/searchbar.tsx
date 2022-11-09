import { Box, Center, GridItem, Input, InputGroup, InputLeftElement, Select, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import { TfiSearch } from "react-icons/tfi"
const Searchbar = () => {
    return (
        <Center zIndex={100}>
                    <InputGroup width={"full"} mr="2">
                        <InputLeftElement pointerEvents="none" children={<TfiSearch/>} />
                        <Input placeholder="Search"  borderRadius={"3xl"} size={"sm"}  />
                    </InputGroup>
                
                  

                    <Select placeholder="5Km" size="sm" borderRadius={"3xl"} width={"100px"}>
                        <option value="option1">2 Km</option>
                        <option value="option2">4 Km</option>
                        <option value="option3">5 Km</option>
                    </Select>
        </Center>
    )
}

export default Searchbar
