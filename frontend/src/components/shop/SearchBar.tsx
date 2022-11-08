import { Center, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react"
import { MdPadding } from "react-icons/md"
import { TbSearch } from "react-icons/tb"
// Search Bar without Actions -> Dummy
const Searchbar = () => {
    return (
            <InputGroup>
                <InputLeftElement p-6 pointerEvents="none" children={<TbSearch />} />
                <Input type="search" placeholder="Search" borderRadius="full" size={"md"} background="white"></Input>
            </InputGroup>
    )
}

export default Searchbar
