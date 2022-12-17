import React, { useEffect, useState } from "react"
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
    Heading,
    Box,
    VStack,
    Flex,
    Text,
    Container,
    Icon,
    useBoolean,
} from "@chakra-ui/react"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import ShowImage from "../../components/restaurant/ShowImage"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import API from "src/function/API"
import { Restaurant2 } from "@apiType/restaurant"
import  Lottie from 'lottie-react'
import loading1 from './animation/loading1.json'
declare global {
    var respage: number, rand: number
}
function LikeorNope() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    //count Number of Nope -> 5 times then Random
    const [count, setcount] = React.useState(1)
    const params = useParams()
    const [property, setproperty] = React.useState<Restaurant2[]>([])
    const navigate = useNavigate()
    // change params to run next restaurant
    const [res, setres] = React.useState(parseInt(params.id + ""))
    const [isError, {on}] = useBoolean()     
    const [isLoading, {off}] = useBoolean(true)
    //when like, it will store userId and resId
    const likedRestaurant = () => {
        API.post("restaurant/" + params.id, { id: params.id, status: true })
    }

    //Get restaurant to show on this page
    useEffect(() => {
        API.get("/restaurant/" + params.id).then((item) => setproperty(item.data))
        .catch((err) => on()) 
        .finally(off)
        API.put("restaurant/" + params.id) 
    }, [params.id])
    

    if (isLoading) 
    return    (
    <AppBody
    secondarynav={[
        { name: "Like or Nope", to: "/restaurant" },
        { name: "My Favorite", to: "/restaurant/favorite" },
        { name: "My History", to: "/restaurant/history" },
    ]}
>
     {/* <Heading color={"black"}>Loading</Heading> */}
     <Box w={"100%"} h={"100%"}>
        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100%"}>
     <Lottie animationData={loading1} style={{scale: 1}}/>
       </Flex>
     </Box>
    </AppBody>
    )

    if(isError) return (
    <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
       <Heading color={"red"}> There is an Error</Heading>
    </AppBody>
    )
    //  console.log(property);
     
    
    const Nope = () => {
        if (res < 5) {
            setres(res + 1)
        } else {
            setres(0)
        }
        setcount(count + 1)
        if (count % 5 == 0) {
            return onOpen()
        }
    }

    globalThis.respage = res
    globalThis.rand = Math.floor(Math.random() * 5) + 1
    const Random = () => {
        setres(globalThis.rand)
        return onClose()
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
            <Box px={2} h={"100%"} pb={6} pt={2}>
                {property.map((e1) => {
                    return (
                        <>
                            <Box py={5} h="20px" mb={"40px"}>
                                <Heading textAlign={"center"} color={"#E65300"}>
                                    {e1.resName}{" "}
                                </Heading>
                            </Box>
                            <ShowImage img={e1.images} />
                        </>
                    )
                })}

                <Container>
                    <Flex flexDirection={"row"} justifyContent={"space-around"} justifyItems={"center"} mt={6}>
                        <Box>
                            <Button colorScheme="green" width="80px" h="80px" borderRadius={"full"} onClick={() => {
                                likedRestaurant()
                                navigate(`/restaurant/detail/${"000" +globalThis.respage}`)
                            }}>
                                <Icon as={AiOutlineLike} w={12} h={12}/>
                            </Button>
                        </Box>

                        <Box>
                            <Button onClick={() => {
                                Nope()
                                navigate(`/restaurant/${"000" + (globalThis.respage == 6 ? 1 : globalThis.respage + 1)}`)
                                }} colorScheme="red" width="80px" h="80px" borderRadius={"full"}>
                             
                                   <Icon as={AiOutlineDislike} w={12} h={12}/>
                            
                            </Button>

                            <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
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
                                        <Button colorScheme="blue" mr={3} onClick={Random} borderRadius={"5px"}>
                                            <Link to={`/restaurant/detail/${"000"+rand}`}>Random</Link>
                                        </Button>

                                        <Button colorScheme="red" mr={3} onClick={onClose} borderRadius={"5px"}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </AppBody>
    )
}

export default LikeorNope
