import { Center, Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react"
import { MdPadding } from "react-icons/md"
import { TbSearch } from "react-icons/tb"
// Search Bar without Actions -> Dummy
const Searchbar = () => {
    return (
        <Flex px="4">
            <InputGroup>
                <InputLeftElement pl="2" pointerEvents="none" children={<TbSearch />} />
                <Input type="search" placeholder="Search" shadow= "md" borderRadius="full" size={"md"} background="white"></Input>
            </InputGroup>
        </Flex>
            
    )
}

export default Searchbar
