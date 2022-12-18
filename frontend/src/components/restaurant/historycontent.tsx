import { Image1, Seen } from "@apiType/restaurant"
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

const Historycontent: FC<{
    resName: string
    date: String
    status: boolean
    img: string
}> = ({ resName, date, status, img }) => {
    console.log(img); 
    // console.log(status);
    // console.log(date.getTime());
    // console.log(date);




    return (
        <>
            <Show below="sm">
                <Box width={"100%"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" boxShadow={"lg"}>
                    <Flex>
                        <Box width={"30%"} ml={"1rem"}>
                          
                               {img == "undefined" ? <Image boxSize="5rem" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} alt="Dan Abramov" borderRadius={"10px"} /> :<Image boxSize="5rem" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyApH4DrOZv8gyZjUEDWOy3wGDSxtGK6ypM`} alt="Dan Abramov" borderRadius={"10px"} />} 
                            
                        </Box>

                        <Box width={"60%"} height={"6rem"} color={"black"}>
                            <Flex direction={"column"} justifyContent={"center"} height={"80%"}>

                                <Text fontSize={"sm"}>
                                    <span style={{ fontWeight: "bold" }}>Name:</span> {resName}
                                </Text>

                                <Text fontSize={"sm"}>
                                    <span style={{ fontWeight: "bold" }}>Date: </span> {date.toString()}
                                </Text>
                                <Text fontSize={"sm"}>
                                    <span style={{ fontWeight: "bold" }}>Status: </span> {status ? "Liked" : "Nope"}
                                </Text>
                            </Flex>
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
                      
                        {img == "undefined" ? <Image boxSize="12.5rem" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} alt="Dan Abramov" borderRadius={"10px"} /> :<Image boxSize="12.5rem" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyApH4DrOZv8gyZjUEDWOy3wGDSxtGK6ypM`} alt="Dan Abramov" borderRadius={"10px"} />} 
                        
                    </Flex>
                    <Box ml={{ lg: "2rem" }} mt={"1rem"} gap={"4"} textAlign={{ sm: "center", lg: "left" }}>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Date:</span> {date.toString()}
                        </Text>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Status:</span>
                            {status ? " Liked" : " Nope"}
                        </Text>
                    </Box>
                </Box>
            </Show>
        </>
    )
}

export default Historycontent
