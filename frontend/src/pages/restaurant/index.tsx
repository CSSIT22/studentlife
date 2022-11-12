import React, { useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Image,
    Heading,
    Input,
    Center,
    Select,
    Spacer,
    Box,
    StackDivider,
    VStack,
    GridItem,
    Flex,
    Text,
    SimpleGrid,
} from "@chakra-ui/react"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper"
import ShowImage from "../../components/restaurant/ShowImage"
import { Restaurant } from "./data/restaurant"
import { Link, useParams } from "react-router-dom"
function Homepage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [count, setcount] = useState(0)
    const property = Restaurant.filter((e1) => {
        return e1.id == count
    })

    const countres = () => {
        setcount(count + 1)
    }

    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Box mb={"30px"}>
                <Searchbar />
            </Box>
            <Box px={2} borderWidth="1px" borderRadius="lg" h={"100%"} pb={6} pt={2}>
                {property.map((e1) => {
                    return (
                        <>
                            <Box h="20px" mb={"40px"}>
                                <Heading textAlign={"center"} color={"#E65300"}>
                                    {e1.resName}{" "}
                                </Heading>
                            </Box>
                            <ShowImage img={e1.img} />
                        </>
                    )
                })}

                <Flex flexDirection={"row"} justifyContent={"space-around"} justifyItems={"center"} mt={6}>
                    <Box>
                        <Button colorScheme="green" width="80px" h="80px" borderRadius={"full"}>
                            <Link to={`/restaurant/detail/${count}`}>
                                <AiOutlineLike size={"xl"} />
                            </Link>
                        </Button>
                    </Box>

                    <Box>
                        <Button
                            onClick={() => {
                                return setcount(count + 1)
                            }}
                            colorScheme="red"
                            width="80px"
                            h="80px"
                            borderRadius={"full"}
                        >
                            <Link to={`/restaurant/${count + 1}`}>
                                <AiOutlineDislike size={"xl"} />
                            </Link>
                        </Button>

                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalOverlay />
                            <ModalContent textAlign={"center"}>
                                <ModalHeader fontWeight="800" fontSize={"35px"}>
                                    Random Time!!!
                                </ModalHeader>
                                <VStack spacing={3} pt="30px">
                                    <Text fontSize={"20px"} fontWeight="500">
                                        Can not choose the restaurant?
                                    </Text>

                                    <Text fontSize={"20px"} fontWeight="500">
                                        Do you want to random the restaurant
                                    </Text>
                                </VStack>
                                <ModalCloseButton />
                                <ModalFooter justifyContent={"center"} pt="60px">
                                    <Button colorScheme="blue" mr={3} onClick={onClose} borderRadius={"5px"}>
                                        Random
                                    </Button>
                                    <Button colorScheme="red" mr={3} onClick={onClose} borderRadius={"5px"}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Flex>
            </Box>
        </AppBody>
    )
}

export default Homepage
