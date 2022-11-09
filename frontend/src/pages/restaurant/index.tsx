import React from "react"
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
    Link,
    SimpleGrid,
} from "@chakra-ui/react"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper"
import ShowImage from "../../components/restaurant/ShowImage"


function likeOrNope() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            
            <Box mb={'30px'}>
                <Searchbar />
            </Box>
            <Box px={2}  borderWidth="1px" borderRadius="lg" h={"100%"} pb={6} pt={2}>
                <Box h="20px" mb={'40px'}>
                    <Heading textAlign={"center"}> Restaurant name</Heading>
                </Box>
                <ShowImage />
               
                <Flex flexDirection={"row"} justifyContent={"space-around"} justifyItems={"center"} mt={6} >
                
                    
                        <Box>
                            <Button colorScheme="green" width="80px" h="80px" borderRadius={"full"} >
                                <Link href="/restaurant/detail">
                                    <AiOutlineLike size={"xl"} />
                                </Link>
                            </Button>
                        </Box>
                        
                        
                        <Box>
                            <Button onClick={onOpen} colorScheme="red" width="80px" h="80px" borderRadius={"full"} >
                                <AiOutlineDislike size={"xl"} />
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
                                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                                            Random
                                        </Button>
                                        <Button colorScheme="red" mr={3} onClick={onClose}>
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

export default likeOrNope
