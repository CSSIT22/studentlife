import { Detail, Image1 } from "@apiType/restaurant"
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
    useDisclosure,
} from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import API from "src/function/API"
import page from "src/pages/test/[id]/page"

const FavoriteContent: FC<{
    id: string
    resName: string
    openTime: string
    phone: string
    website: string
    link: string
    img: string
    load: Function
}> = ({ id, resName, phone, openTime, website, link, img, load }) => {
    // const [status, setstatus] = useState(true);
    // useEffect(() => {
    //     API.get("/restaurant/favorite?userid=" + "101")
    //         .then((item) => setstatus(item.data))
    // }, [status])
     
    const deleteRes = () => {
        API.post("restaurant/Favorite", { id: id })
    }

    // const load = () => {
    //     setstatus(!status)
    // }

    return (
        <>
            <Show below="sm">
                <Box width={"100%"} height={"90%"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" boxShadow={"lg"}  flexDirection={"row"}  alignItems={"center"}>
                    <Popover placement="auto">
                        {({ onClose }: any) => (
                            <>
                                <PopoverTrigger>
                                    <Flex justifyContent={"end"} height={3}>
                                        <AiOutlineClose />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"} border="0">
                                        ARE YOU SURE
                                    </PopoverHeader>
                                    <PopoverBody border="0"> you want to unfavorite this restaurant?</PopoverBody>
                                    <PopoverFooter display="flex" justifyContent="center" border="0">
                                        <ButtonGroup size="sm">
                                            <Button colorScheme="green" onClick={onClose} mr={2}>
                                                Yes
                                            </Button>

                                            <Button colorScheme="red" onClick={onClose} ml={2}>
                                                No
                                            </Button>
                                        </ButtonGroup>
                                    </PopoverFooter>
                                </PopoverContent>
                            </>
                        )}
                    </Popover>
                    <Link to={link}>
                    <Flex alignItems={"center"} maxWidth="100%">
                    <Box  width={"30%"} ml={"1rem"}>
                          
                          {img == "undefined" ? <Image boxSize="5rem" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} alt="Dan Abramov" borderRadius={"10px"} /> :<Image boxSize="5rem" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyAqb4YbGEyTrN-YuD1HJPimROcG4hVMaTM`} alt="Dan Abramov" borderRadius={"10px"} />} 
                       
                   </Box>
                        {/* </Show> */}

                        <Box width={"60%"} color={"black"} pl={"5"}>
                            <Text fontSize={{ base: "small", lg: "lg" }}>
                                <span style={{ fontWeight: "bold" }}>Name:</span> {resName}
                            </Text>
                            <Text fontSize={{ base: "small", lg: "lg" }}>
                                <span style={{ fontWeight: "bold" }}>Open:</span> {openTime}
                            </Text>
                            <Text fontSize={{ base: "small", lg: "lg" }}>
                                <span style={{ fontWeight: "bold" }}>Phone:</span> {phone}
                            </Text>
                            <Text fontSize={{ base: "small", lg: "lg" }}>
                                <span style={{ fontWeight: "bold" }}>Website:</span> <a href={website}>{resName}</a>
                            </Text>
                        </Box>
                    </Flex>
                    </Link>
                </Box>
                
            </Show>
            <Show above="sm">
                <Box width={"100%"} height={"90%"} p={5} shadow="md" backgroundColor={"white"} borderWidth="1px" mt={"35px"} borderRadius={"lg"} display={"flex"} flexDirection={"column"}  justifyContent={"center"} >
                    <Popover placement="bottom">
                        {({ onClose }: any) => (
                            <>
                                <PopoverTrigger>
                                    <Flex justifyContent={"end"} height={3}>
                                        <AiOutlineClose />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent borderWidth={"2px"} borderColor="black">
                                    <PopoverArrow bg={"red"} />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"} border="0" color={"#E53E3E"} fontWeight={"bold"}>
                                        ARE YOU SURE
                                    </PopoverHeader>
                                    <PopoverBody textAlign={"center"} fontWeight={"bold"}>
                                        {" "}
                                        you want to unfavorite <br />
                                        this restaurant?
                                    </PopoverBody>
                                    <PopoverFooter display="flex" justifyContent="center" border="0">
                                        <ButtonGroup size="sm">
                                            <Button colorScheme="green" mr={2} onClick={() => {
                                                deleteRes()
                                                load()
                                                onClose()
                                            }}>
                                                Yes
                                            </Button>

                                            <Button colorScheme="red" onClick={onClose} ml={2}>
                                                No
                                            </Button>
                                        </ButtonGroup>
                                    </PopoverFooter>
                                </PopoverContent>
                            </>
                        )}
                    </Popover>
                    <Link to={link}>
                        <Flex direction={"column"} alignItems={"center"} gap={"4"}>
                            <Heading textAlign={"center"} color={"#E65D10"} fontSize="xl">
                                {resName}
                            </Heading>
                            {img == "undefined" ? <Image boxSize="12.5rem" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} borderRadius={"10px"} width="100%" height="100%"/> : <Image boxSize={"12.5rem"} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyAqb4YbGEyTrN-YuD1HJPimROcG4hVMaTM`} borderRadius={"10px"} />}
                        </Flex>
                        <Box ml={{ lg: "2rem" }} mt={"1rem"} gap={"4"} textAlign={{ sm: "center", lg: "left" }}>
                            <Text>
                                <span style={{ fontWeight: "bold" }}>Open:</span> {openTime}
                            </Text>
                            <Text>
                                <span style={{ fontWeight: "bold" }}>Phone Number:</span> {phone}
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

export default FavoriteContent
