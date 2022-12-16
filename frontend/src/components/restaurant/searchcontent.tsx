import { Close, Detail, Image1, Open, Opening } from "@apiType/restaurant"
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
import axios from "axios"
import React, { FC } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"
import API from "src/function/API"

const Searchcontent: FC<{
    resName: string
    open: Opening
    close: object
    phone: string
    website: string
    img: string
    link: string,
    resid: string
}> = ({ resName, phone, open, close, website, img, link, resid}) => {

    // console.log(open?.periods);

    const likedRestaurant = () => {
        API.post("restaurant/" + resid, { id: resid, status: true })
    }
    
    return (
        <>
            <Show below="sm">
                <Box width={"100%"} height={"8rem"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" boxShadow={"lg"}>
                    <Link to={link} onClick={() => {
                        likedRestaurant()
                    }}>
                    <Flex mb={"15px"}>
                        <Box width={"30%"} ml={"1rem"}>
                            <Image boxSize="5rem" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`} alt="Dan Abramov" borderRadius={"10px"} />
                        </Box>
                        <Box width={"60%"} height={"6rem"} color={"black"}>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Name:</span> {resName}
                            </Text>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Status:</span> {open?.open_now == true ? "opening" : "closing"}
                            </Text>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Phone:</span> {phone == undefined ? "-" : phone}
                            </Text>
                            <Text fontSize={"sm"}>
                                <span style={{ fontWeight: "bold" }}>Website:</span> <a href={website}>{resName}</a>
                            </Text>
                        </Box>
                    </Flex>
                    </Link>
                </Box>
            </Show>
            <Show above="sm">
                <Box width={"100%"} p={5} shadow="md" borderWidth="1px" mt={"35px"} borderRadius={"lg"} backgroundColor={"white"}>
                    <Link to={link} onClick={() => {
                        likedRestaurant()
                    }}>
                    <Flex direction={"column"} alignItems={"center"} gap={"4"}>
                        <Heading color={"#E65D10"} fontSize="xl">
                            {resName}
                        </Heading>
                        <Image
                            boxSize={"12.5rem"}
                            // height={{ lg: "9.5rem" }}
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyCkJ_22DpS7aG2EcbXNL3xUEHpFyhFncr8`}
                            alt="Dan Abramov"
                            borderRadius={"10px"}
                        />
                    </Flex>
                    <Box ml={{ lg: "2rem" }} mt={"1rem"} gap={"4"} textAlign={{ sm: "center", lg: "left" }}>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Status:</span> {open?.open_now == true ? "opening" : "closing"}
                        </Text>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Phone:</span> {phone == undefined ? "-" : phone}
                        </Text>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Website:</span> <a href={website}>{resName}</a>
                        </Text>
                    </Box>
                    </Link>
                </Box>
            </Show>
        </>
    )
}

export default Searchcontent
