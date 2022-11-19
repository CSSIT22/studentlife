import { Center, Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { MdPadding } from "react-icons/md"
import { TbSearch } from "react-icons/tb"
import { products } from "./content/dummyData/products"
// Search Bar without Actions -> Dummy
const Searchbar: FC<{
    setSearchQuery: Dispatch<SetStateAction<string>>
    searchQuery: string
    setProducts: React.Dispatch<
        React.SetStateAction<
            {
                productId: number
                name: string
                image: string
                brand: string
                price: number
                categoryId: number
                contactId: number
                description: string
                color: string
                size: string
                stock: number
                deliveryFee: number
            }[]
        >
    >
    productsIn: {
        productId: number
        name: string
        image: string
        brand: string
        price: number
        categoryId: number
        contactId: number
        description: string
        color: string
        size: string
        stock: number
        deliveryFee: number
    }[]
}> = ({ productsIn, searchQuery, setSearchQuery, setProducts}) => {
    const [timer, setTimer] = useState<number | null>(null)
    const didMount = useDidMount()

    useEffect(() => {
        if (didMount) {
            setProducts(() => products.filter((arr) => arr.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
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
        <Flex px="4">
            <InputGroup>
                <InputLeftElement pl="2" pointerEvents="none" children={<TbSearch />} />
                <Input
                    type="search"
                    placeholder="Search"
                    id="search"
                    name="search"
                    shadow="md"
                    border="1px solid #CBD5E0"
                    borderRadius="10px"
                    size={"md"}
                    background="white"
                    onChange={(e) => handleSearchChange(e)}
                ></Input>
            </InputGroup>
        </Flex>
    )
}

export default Searchbar
