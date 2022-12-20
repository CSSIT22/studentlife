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
import { Link, Navigate, useNavigate } from "react-router-dom"
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
     const navigate = useNavigate()
    // console.log(open?.periods);
    // console.log(img);
    
    const likedRestaurant = async() => {
        await API.post(`restaurant/search`, { id: resid, status: true })
        // navigate(`restaurant/detail?resId=${resid}&id=0`)
        navigate(link)
    }
    
    return (
        <>
            <Show below="sm">
            <Flex width={"100%"} height={"100%"} p={5} shadow="md" borderWidth="1px" mt={"35px"} borderRadius={"lg"} backgroundColor={"white"} onClick={() => likedRestaurant()} cursor={"pointer"} flexDirection={"row"}  alignItems={"center"}>
                {/* <Link onClick={async() => { */}
                       {/* await likedRestaurant() */}
                    {/* navigate(`restaurant/detail?resId=${resid}&id=0`) */}
                    {/* }} to={link} >  */}
                    <Flex mb={"15px"} alignItems={"center"}>
                        <Box  width={"30%"} ml={"1rem"} mr={"1rem"}>
                            <Image boxSize="5rem" src={img == null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" :`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyAqb4YbGEyTrN-YuD1HJPimROcG4hVMaTM`} alt="Dan Abramov" borderRadius={"10px"} />
                        </Box>
                        <Box width={"60%"} height={"6rem"} color={"black"} display={"flex"} flexDirection={"column" } justifyContent={"center"}>
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
                  {/* </Link> */}
                </Flex>
            </Show>
            <Show above="sm">
                <Flex width={"100%"} height={"90%"} p={5} shadow="md" borderWidth="1px" mt={"35px"} borderRadius={"lg"} backgroundColor={"white"} onClick={() => likedRestaurant()} cursor={"pointer"} flexDirection={"column"}  justifyContent={"center"}>
                    {/* <Link to={link} onClick={async() => { */}
                       {/* await likedRestaurant() */}
                    {/* //    navigate(`restaurant/detail?resId=${resid}&id=0`) */}
                    {/* }} > */}
                    
                    <Flex direction={"column"} alignItems={"center"} gap={"4"}>
                        <Heading textAlign={"center"} color={"#E65D10"} fontSize="xl">
                            {resName}
                        </Heading>
                        <Image
                            boxSize={"12.5rem"}
                            // height={{ lg: "9.5rem" }}
                            src={img == null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" :`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyAqb4YbGEyTrN-YuD1HJPimROcG4hVMaTM`}
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
                    {/* </Link> */}
                 
                </Flex>
                
            </Show>
        </>
    )
}

export default Searchcontent
