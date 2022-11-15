import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

const DatingRatingSearch: FC<{
    setSearchQuery: Dispatch<SetStateAction<string>>
    searchQuery: string
    setFriends: React.Dispatch<
        React.SetStateAction<
            {
                UserId: string
                Fname: string
                Lname: string
                Gender: string
                Age: string
                Faculty: string
                url: string
                interestId: number[]
                rate: number
            }[]
        >
    >
    FRIENDS: {
        UserId: string
        Fname: string
        Lname: string
        Gender: string
        Age: string
        Faculty: string
        url: string
        interestId: number[]
        rate: number
    }[]
}> = ({ setSearchQuery, searchQuery, setFriends, FRIENDS }) => {
    const [timer, setTimer] = useState<number | null>(null)
    const didMount = useDidMount()

    useEffect(() => {
        if (didMount) {
            setFriends(() => FRIENDS.filter((arr) => arr.Fname.toLowerCase().concat(arr.Lname.toLowerCase()).includes(searchQuery.toLowerCase())))
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
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                onChange={(e) => handleSearchChange(e)}
            />
        </InputGroup>
    )
}

export default DatingRatingSearch
