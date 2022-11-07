import { Input } from "@chakra-ui/react"
import React, { Dispatch, FC, SetStateAction } from "react"

const DatingInterestSearch:FC<{setSearchQuery: Dispatch<SetStateAction<string>>; searchQuery: string}> = ({setSearchQuery, searchQuery}) => {
    // Check if user has press enter when currently in the search bar
    function handleSearchEnter(event: React.KeyboardEvent<HTMLInputElement>) {    
        if (event.key === "Enter" && searchQuery != "") {
            alert("Query: " + searchQuery)
        }
        return false
    }

    function handleSearchType(event: React.ChangeEvent<HTMLInputElement>) {
        let searchQueryInBox = (document.getElementById("search") as HTMLInputElement).value
        setSearchQuery(searchQueryInBox)
    }

    return (
        <Input type="search" placeholder="🔍  Search" size="md" borderRadius="full" id="search" name="search" onChange={(e) => handleSearchType(e)} onKeyPress={(e) => handleSearchEnter(e)} />
    )
}

export default DatingInterestSearch
