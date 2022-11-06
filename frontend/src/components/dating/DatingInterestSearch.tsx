import { Input } from "@chakra-ui/react"
import React from "react"

const DatingInterestSearch = () => {
    function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
        var searchQuery = (document.getElementById("search") as HTMLInputElement).value
        if (event.key === "Enter" && searchQuery != "") {
            alert("Query: " + searchQuery)
        }
        return false
    }

    return (
        <Input type="search" placeholder="🔍  Search" size="md" borderRadius="full" id="search" name="search" onKeyPress={(e) => handleSearch(e)} />
    )
}

export default DatingInterestSearch
