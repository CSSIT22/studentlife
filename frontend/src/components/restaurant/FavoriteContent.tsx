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
import React, { FC, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"
import { Restaurant } from "src/pages/restaurant/data/restaurant"

const FavoriteContent: FC<{
    id: number
    resName: string
    open: string
    close: string
    phone: string
    website: string
    link: string
    img: string
}> = ({ id,resName, phone, open, close, website,link, img }) => {
    const {onClose} = useDisclosure()
    const DeleteFv = () => {
        Restaurant[id].status = false
        console.log(Restaurant[id].status)
    }
    

    return (
        <>
            <Show below="sm">
            <Box width={"100%"} mt={"25px"} backgroundColor={"white"} p={"5"} borderRadius="lg" boxShadow={"lg"} >
                    <Popover placement="auto">
                        {/* {({onClose}) => (
                            <> */}
                                <PopoverTrigger>
                                    <Flex justifyContent={"end"} height={3}>
                                        <AiOutlineClose />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"} border='0'>ARE YOU SURE</PopoverHeader>
                                    <PopoverBody border='0'> you want to unfavorite this restaurant?</PopoverBody>
                                    <PopoverFooter display="flex" justifyContent="center" border='0'>
                                        <ButtonGroup size="sm">
                                            <Button colorScheme="green" onClick={DeleteFv} mr={2}>
                                                Yes
                                            </Button>

                                            <Button colorScheme="red" onClick={onClose} ml={2}>
                                                No
                                            </Button>
                                        </ButtonGroup>
                                    </PopoverFooter>
                                </PopoverContent>
                            {/* </>
                        )} */}
                    </Popover>

                    <Flex alignItems={"center"}>
                    <Box width={"30%"} ml={"1rem"}>
                            <Image boxSize="5rem" src={img} alt="Dan Abramov" borderRadius={"10px"} />
                        </Box>
                        {/* </Show> */}
                       
                        <Box width={"60%"} color={"black"}>
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
                       
                    </Flex>
                </Box>
            </Show>
            <Show above="sm">
                <Box width={"100%"} p={5} shadow="md" borderWidth="1px" mt={"35px"} borderRadius={"lg"}>
                    <Popover placement="bottom">
                        {({ onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Flex justifyContent={"end"} height={3}>
                                        <AiOutlineClose />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent borderWidth={"2px"} borderColor='black'>
                                    <PopoverArrow bg={'red'}/>
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign={"center"} border='0' color={"#E53E3E"} fontWeight={"bold"}>ARE YOU SURE</PopoverHeader>
                                    <PopoverBody textAlign={"center"} fontWeight={"bold"} > you want to unfavorite <br/>this restaurant?</PopoverBody>
                                    <PopoverFooter display="flex" justifyContent="center" border='0'>
                                        <ButtonGroup size="sm">
                                            <Button colorScheme="green" onClick={DeleteFv} mr={2}>
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
                            <Heading color={"#E65D10"} fontSize="xl">
                                {resName}
                            </Heading>
                            <Image
                                boxSize={"12.5rem"}
                                src={img}
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
                    </Link>
                </Box>
            </Show>
        </>
    )
}

export default FavoriteContent
