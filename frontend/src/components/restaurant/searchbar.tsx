import { Box, Center, Flex, Input, Select } from "@chakra-ui/react"
import React from "react"

const Searchbar = () => {
    return (
      <Box >
        <Flex >
            <Input variant="outline" placeholder="Search" htmlSize={80} width={"auto"} borderRadius={"3xl"} size={"sm"} />
           
            <Select placeholder="5 Km" size="sm" borderRadius={"3xl"} width={"220px"}>
                <option value="option1">2 Km</option>
                <option value="option2">4 Km</option>
                <option value="option3">5 Km</option>
            </Select>
            </Flex>
            </Box>
    )
}

export default Searchbar
