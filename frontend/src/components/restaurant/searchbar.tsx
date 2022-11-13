import { Box, Center, Flex, GridItem, Input, InputGroup, InputLeftElement, Select, SimpleGrid } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { TfiSearch } from "react-icons/tfi"
import { Restaurant } from "src/pages/restaurant/data/restaurant"
const Searchbar = () => {
    const [message, setmessage] = useState("")
    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        setmessage(event.target.value);
        console.log(event.target.value);
    }
    return (
        <Center>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <InputGroup id="se" width={{ base: "13rem", lg: "20rem" }} mr="2" backgroundColor={"white"} boxShadow={"lg"}>
                    <InputLeftElement children={<TfiSearch />} pb={1} />
                    <Input placeholder="Search" borderRadius={"6px"} onChange={search} type={"text"} value={message}/ >
                </InputGroup>
            </Flex>

            <Select placeholder="5Km" borderRadius={"6px"} width={"5.5rem"} backgroundColor={"white"} boxShadow={"md"}>
                <option value="option1">2 Km</option>
                <option value="option2">4 Km</option>
                <option value="option3">5 Km</option>
            </Select>
        </Center>
    )
}

export default Searchbar
