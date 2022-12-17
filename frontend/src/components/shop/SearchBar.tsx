import { Shop_Product, Shop_Product_With_Images } from "@apiType/shop"
import { Center, Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Select, Spinner, useBoolean } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { TbSearch } from "react-icons/tb"
import API from "src/function/API"
// Search Bar without Actions -> Dummy
const Searchbar: FC<{
    setSearchQuery: Dispatch<SetStateAction<string>>
    searchQuery: string
    setProducts: React.Dispatch<React.SetStateAction<Shop_Product_With_Images[] | null>>
}> = ({ searchQuery, setSearchQuery, setProducts }) => {
    const [timer, setTimer] = useState<number | null>(null)
    const didMount = useDidMount()
    function useDidMount() {
        const [didMount, setDidMount] = useState(false)
        useEffect(() => {
            setDidMount(true)
        }, [])

        return didMount
    }

    const [products, setProductList] = useState<Shop_Product_With_Images[] | null>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getAllProducts = API.get("/shop/getAllProducts")
    useEffect(() => {
        getAllProducts.then((res) => setProductList(res.data)).catch((err) => on()).finally(() => off())
        if (didMount) {
            if (products != null){
                setProducts(() => products.filter((arr: any) => arr.productName.toLowerCase().includes(searchQuery.toLowerCase())))
            } 
        }
    }, [searchQuery])
    if (isError) {
        return <Heading>There is an Error! Please Try Again Later</Heading>
    }
    if (isLoading) {
        return <Spinner />
    }

    // Check if user has press enter when currently in the search bar
    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }
        setTimer(
            window.setTimeout(() => {
                setSearchQuery(event.target.value)
            }, 100)
        )
    }
    return (
        <Flex px="4">
            <InputGroup _hover={{ transform: "scale(1.01)" }} transitionDuration="200ms">
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
