import { Box, Button, Center, Flex, Input, InputGroup, InputLeftElement, Select, SimpleGrid } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { TfiSearch } from "react-icons/tfi"
import { useNavigate } from "react-router-dom"
const Searchbar:FC<{
    selectRadius: Function
}> = ({selectRadius}) => {
    let [search, setSearch] = React.useState<any>()
    const navigate = useNavigate()

    function handleSubmit(event: any) {
        event.preventDefault()
        setSearch(search)
        // console.log(search)

        navigate(`/restaurant/search?name=${search}`)
    }

    // const selectRadius = () => {
    //     API.get()
    // }
    return (
        <Center>
            <form onSubmit={handleSubmit}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <InputGroup id="se" width={{ base: "13rem", lg: "20rem" }} mr="2" backgroundColor={"white"} boxShadow={"lg"} borderRadius={"6px"}>
                        <InputLeftElement children={<TfiSearch />} pt={1} pl="2" />

                        <Input
                            placeholder="Search"
                            onChange={(event) => {
                                setSearch(event.target.value)
                            }}
                            autoComplete="off"
                            type={"text"}
                            value={search}
                        />

                        <Button type="submit" hidden={true}>
                            Submit
                        </Button>
                    </InputGroup>
                </Flex>
            </form>

            <Select borderRadius={"30px"} width={"6.5rem"} backgroundColor={"white"} boxShadow={"md"}  onChange={(e1) => selectRadius(e1.target.value)}>
                <option value={500}>0.5 Km</option>
                <option value={1000}>1 Km</option>
                <option value={1500}>1.5 Km</option>
            </Select>
        </Center>
    )
}

export default Searchbar


