import { Close, Detail, Image1, Open } from "@apiType/restaurant"
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Show,
    Text,
} from "@chakra-ui/react"
import React, { FC } from "react"
import { AiOutlineClose } from "react-icons/ai"

const Searchcontent: FC<{
    resName: string
    open: string
    close: string
    phone: Detail
    website: Detail
    img: Array<Image1>
}> = ({ resName, phone, open, close, website, img }) => {

    
    return (
        <>
            <Show below="sm">
                <Box width={"100%"} height={"8rem"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" boxShadow={"lg"}>
                    <Flex mb={"15px"}>
                        <Box width={"30%"} ml={"1rem"}>
                            <Image boxSize="5rem" src={img[0]?.image} alt="Dan Abramov" borderRadius={"10px"} />
                        </Box>
                        <Box width={"60%"} height={"6rem"} color={"black"}>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Name:</span> {resName}
                            </Text>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Open:</span> {open} - {close}
                            </Text>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Phone Number:</span> {phone?.phoneNo}
                            </Text>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Website:</span> <a href={website.website}>{resName}</a>
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Show>
            <Show above="sm">
                <Box width={"100%"} p={5} shadow="md" borderWidth="1px" mt={"35px"} borderRadius={"lg"} backgroundColor={"white"}>
                    <Flex direction={"column"} alignItems={"center"} gap={"4"}>
                        <Heading color={"#E65D10"} fontSize="xl">
                            {resName}
                        </Heading>
                        <Image
                            boxSize={"12.5rem"}
                            // height={{ lg: "9.5rem" }}
                            src={img[0].image}
                            alt="Dan Abramov"
                            borderRadius={"10px"}
                        />
                    </Flex>
                    <Box ml={{ lg: "2rem" }} mt={"1rem"} gap={"4"} textAlign={{ sm: "center", lg: "left" }}>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Open:</span> {open} - {close}
                        </Text>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Phone Number:</span> {phone.phoneNo}
                        </Text>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Website:</span> <a href={website.website}>{resName}</a>
                        </Text>
                    </Box>
                </Box>
            </Show>
        </>
    )
}

export default Searchcontent
