import { FC, Dispatch, SetStateAction, useState, useEffect } from "react"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { AiOutlineSearch } from "react-icons/ai"

const QAnsSearchBar: FC<{
    setSearchQuery: Dispatch<SetStateAction<string>>
    searchQuery: string
    setTags: React.Dispatch<
        React.SetStateAction<
            {
                tagId: number
                tagName: string
            }[]
        >
    >
    DEFAULT_TAGS: {
        tagId: number
        tagName: string
    }[]
}> = ({ setSearchQuery, searchQuery, setTags, DEFAULT_TAGS }) => {
    const [timer, setTimer] = useState<number | null>(null)
    const didMount = useDidMount()

    // lower case ?
    useEffect(() => {
        if (didMount) {
            setTags(() => DEFAULT_TAGS.filter((arr) => arr.tagName.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }, [searchQuery])

    // Prevent useEffect from triggering immediately when enter the page
    function useDidMount() {
        const [didMount, setDidMount] = useState(false)
        useEffect(() => {
            setDidMount(true)
        }, [])

        return didMount
    }

    // Check if user has press enter when currently in the search bar
    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        // Used for prevent delay when typing in search box
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
                placeholder="🔍  Search for keywords in public Q&A..."
                size="md"
                borderRadius={"6px"}
                name="publicSearch"
                id="publicSearch"
                border="1px solid #CBD5E0"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1)
                            , 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                onChange={(e) => handleSearchChange(e)}
            />
        </InputGroup>
    )
}

export default QAnsSearchBar
