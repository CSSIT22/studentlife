import { RateFollow } from "@apiType/dating"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

const DatingRatingSearch: FC<{
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    searchQuery: string
    setFriends: React.Dispatch<React.SetStateAction<RateFollow[]>>
    FRIENDS: RateFollow[]
}> = ({ setSearchQuery, searchQuery, setFriends, FRIENDS }) => {
    const [timer, setTimer] = useState<number | null>(null)
    const didMount = useDidMount()

    useEffect(() => {
        if (didMount) {
            setFriends(() => FRIENDS.filter((arr) => arr.scoreReceiver.fName.toLowerCase().concat(" " + arr.scoreReceiver.lName.toLowerCase()).includes(searchQuery.toLowerCase())))
        }

        // alert('Query: "' + searchQuery + '"')
    }, [searchQuery])

    function useDidMount() {
        const [didMount, setDidMount] = useState(false)
        useEffect(() => {
            setDidMount(true)
        }, [])

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
            }, 100)
        )
    }

    return (
        <InputGroup>
            <InputLeftElement pointerEvents="none" children={<AiOutlineSearch color="gray.300" />} />
            <Input
                type="search"
                placeholder="Search"
                size="md"
                borderRadius="6px"
                id="search"
                name="search"
                border="1px solid #CBD5E0"
                bgColor="white"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                onChange={(e) => handleSearchChange(e)}
            />
        </InputGroup>
    )
}

export default DatingRatingSearch
