import { Box, Button, Center, Flex, FormControl, GridItem, Input, InputGroup, InputLeftElement, Select, SimpleGrid } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { TfiSearch } from "react-icons/tfi"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Restaurant } from "src/pages/restaurant/data/restaurant"
const Searchbar = () => {
    // const [message, setmessage] = useState("")
    let [search, setSearch] = React.useState<any>()
    const navigate = useNavigate()
    // const params = useParams<any>()

    // const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setmessage(event.target.value);
    //     console.log(event.target.value);
    //     alert(message)
    // }
    // const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault()
    //     alert(message)
    // }

    const serializeFormQuery = () => {

    }

    function handleSubmit(event:any) {
        event.preventDefault();
        // The serialize function here would be responsible for
        // creating an object of { key: value } pairs from the
        // fields in the form that make up the query.
        // console.log(searchParams);
        
        setSearch(search);
        console.log(search)
        
        navigate(`/restaurant/search?name=${search}`)
        
      }
    return (
        <Center>
            <form
                onSubmit={handleSubmit}
            >
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <InputGroup id="se" width={{ base: "13rem", lg: "20rem" }} mr="2" backgroundColor={"white"} boxShadow={"lg"}>
                        <InputLeftElement children={<TfiSearch />} pb={1} />

                        <Input
                            placeholder="Search"
                            borderRadius={"6px"}
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

            <Select placeholder="5 Km" borderRadius={"30px"} width={"5.5rem"} backgroundColor={"white"} boxShadow={"md"}>
                <option value="option2">10 Km</option>
                <option value="option3">15 Km</option>
            </Select>
        </Center>
    )
}

export default Searchbar
