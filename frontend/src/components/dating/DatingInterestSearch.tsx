import { Box, Input, Text } from "@chakra-ui/react"
import React, { Component, Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react"

const DatingInterestSearch: FC<{ setSearchQuery: Dispatch<SetStateAction<string>>; searchQuery: string }> = ({ setSearchQuery, searchQuery }) => {
    const [timer, setTimer] = useState<number | null>(null)
    const didMount = useDidMount()

    useEffect(() => {
        if (didMount) alert(searchQuery)
      }, [searchQuery])

    function useDidMount() {
        const [didMount, setDidMount] = useState(false)
        useEffect(() => { setDidMount(true) }, [])
      
        return didMount
    }


    // Check if user has press enter when currently in the search bar
    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }
        setTimer(
            setTimeout(() => {
                setSearchQuery(event.target.value)
            }, 1000)
        )
    }

    return (
        <Input
            type="search"
            placeholder="🔍  Search"
            size="md"
            borderRadius="full"
            id="search"
            name="search"
            onChange={(e) => handleSearchChange(e)}
        />
    )
}

export default DatingInterestSearch
