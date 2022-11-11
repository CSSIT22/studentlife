import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Grid,
    GridItem,
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
import React, { FC, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { Restaurant } from "src/pages/restaurant/data/restaurant"

const FavoriteContent: FC<{
    resName: string
    open: string
    close: string
    phone: string
    website: string
}> = ({ resName, phone, open, close, website }) => {
    // const ClosePop = () => {
    //     setclose(true);
    //     // console.log(close);

    // }

    return (
        // <Box mb={{lg:"4rem"}} width="100%">
        //    {/* <Flex direction={"row"} justifyContent={"center"}>
        //     <Show above="lg">
        //             <Box width={"30%"} mt={"35px"}>
        //                 <Image boxSize="12.5rem" height={"9.6rem"} src="https://bit.ly/dan-abramov" alt="Dan Abramov" borderRadius={"10px"} />
        //             </Box>
        //         </Show> */}
        <>
            <Show below="sm">
                <Box width={"100%"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" boxShadow={"lg"}>
                    <Popover placement="auto">
                        {({ isOpen, onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Flex justifyContent={"end"} height={3}>
                                        <AiOutlineClose />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"}>ARE YOU SURE</PopoverHeader>
                                    <PopoverBody> you want to unfavorite this restaurant?</PopoverBody>
                                    <PopoverFooter display="flex" justifyContent="center">
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

                    <Flex mb={"15px"}>
                        {/* <Show below="lg"> */}
                        <Box width={"30%"}>
                            <Image
                                boxSize={{ base: "5rem", lg: "12.5rem" }}
                                height={{ lg: "9.5rem" }}
                                src="https://bit.ly/dan-abramov"
                                alt="Dan Abramov"
                                borderRadius={"10px"}
                            />
                        </Box>
                        {/* </Show> */}
                        <Box width={"100%"} display="flex" justifyContent={"center"}>
                            <Box width={"70%"} color={"black"}>
                                <Text fontSize={{ base: "sm", lg: "lg" }}>
                                    <span style={{ fontWeight: "bold" }}>Name:</span> {resName}
                                </Text>
                                <Text fontSize={{ base: "sm", lg: "lg" }}>
                                    <span style={{ fontWeight: "bold" }}>Open:</span> {open} - {close}
                                </Text>
                                <Text fontSize={{ base: "sm", lg: "lg" }}>
                                    <span style={{ fontWeight: "bold" }}>Phone:</span> {phone}
                                </Text>
                                <Text fontSize={{ base: "sm", lg: "lg" }}>
                                    <span style={{ fontWeight: "bold" }}>Website:</span> <a href={website}>{resName}</a>
                                </Text>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Show>
            <Show above="sm">
                <Box width={"100%"} p={5} shadow="md" borderWidth="1px" mt={"35px"} borderRadius={"lg"}>
                    <Popover placement="bottom">
                        {({ isOpen, onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Flex justifyContent={"end"} height={3}>
                                        <AiOutlineClose />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"}>ARE YOU SURE</PopoverHeader>
                                    <PopoverBody> you want to unfavorite this restaurant?</PopoverBody>
                                    <PopoverFooter display="flex" justifyContent="center">
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
                    <Flex direction={"column"} alignItems={"center"} gap={"4"}>
                        <Heading color={"#E65D10"} fontSize="xl">
                            {resName}
                        </Heading>
                        <Image
                            boxSize={"12.5rem"}
                            // height={{ lg: "9.5rem" }}
                            src="https://bit.ly/dan-abramov"
                            alt="Dan Abramov"
                            borderRadius={"10px"}
                        />
                    </Flex>
                    <Box ml={{ lg: "2rem" }} mt={"1rem"} gap={"4"} textAlign={{ sm: "center", lg: "left" }}>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Open:</span> {open} - {close}
                        </Text>
                        <Text>
                            {" "}
                            <span style={{ fontWeight: "bold" }}>Phone Number:</span> {phone}
                        </Text>
                        <Text>
                            <span style={{ fontWeight: "bold" }}>Website:</span> <a href={website}>{resName}</a>
                        </Text>
                    </Box>
                </Box>
            </Show>
        </>
    )
}

export default FavoriteContent
