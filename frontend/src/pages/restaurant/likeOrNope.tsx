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
import Lottie from 'lottie-react'
import loading1 from './animation/loading1.json'
import notloading2 from './animation/notloading2.json'
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
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    //when like, it will store userId and resId
    const [radius, setradius] = useState(500);
    const [nextres, setnextres] = useState(true);
    const [rand, setrand] = React.useState<Restaurant2[]>([])
    // const [finish, setfinish] = useState(false);
    const getRandom = async(id:number) => {
        // console.log(id);
        const rand = await API.get("/restaurant/likeOrNope?radius=" + radius + `&id=${id}`)
        const res = rand.data
        // console.log(rand.data.resId);
        

        if(!res.resId != null) {
            // console.log("เสร็จยัง" + res);
            
            await API.post("restaurant/likeOrNope", { id: res.resId, status: true });
            navigate(`/restaurant/detail?resId=${res.resId}` + `&id=${id}` + "&total=" + res.likes)
        }

    }
    // console.log(finish);

    const selectRadius = (radius: number) => {
        setradius(radius)
    }
    const [id, setid] = useState(0);


    const plusId = () => {
        setid(parseInt(new URLSearchParams(location.search).get("id") + "") > id ? parseInt(new URLSearchParams(location.search).get("id") + "") : id)
        if (id < property[0].likes - 1) {
            setid(id + 1)
        }
        else {
            setid(0)
        }

    }

    //Get restaurant to show on this page
    useEffect(() => {
        navigate(`/restaurant/likeOrNope?radius=${radius}&id=${id}`)
        API.get("/restaurant/likeOrNope?radius=" + radius + `&id=${parseInt(new URLSearchParams(location.search).get("id") + "") > id ? parseInt(new URLSearchParams(location.search).get("id") + "") : id}`).then((item) => setproperty([item.data]))
            .catch((err) => on())
            .finally(off)

        // API.put("restaurant/" + params.id) 
    }, [nextres])

    const likedRestaurant = async () => {
        await API.post("restaurant/likeOrNope", { id: property[0]?.resId, status: true })
        navigate(`/restaurant/detail?resId=${property[0]?.resId}` + `&id=${id}` + "&total=" + property[0].likes)
    }
    // console.log(radius);

    useEffect(() => {
        return () => {
            setid(0)
        };
    }, [radius]);



    if (isLoading)
        return (
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
                        <Lottie animationData={loading1} style={{ scale: 1 }} />
                    </Flex>
                </Box>
            </AppBody>
        )

    if (isError) return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Box width="100%" height="100%">
                <Flex justifyContent={"center"} alignItems={"center"} width="100%" height="100%" mt={"8rem"}>
                    <Lottie animationData={notloading2} style={{ scale: 1 }} />
                </Flex>
            </Box>
        </AppBody>
    )
    //  console.log(property);


    const Nope = () => {
        // if (res < 5) {
        //     setres(res + 1)
        // } else {
        //     setres(0)
        // }
        setcount(count + 1)
        if (count % 5 == 0) {
            return onOpen()
        }
    }

    // console.log(id);

    globalThis.respage = res
    globalThis.rand = Math.floor(Math.random() * (property[0].likes - id) + id)
    // console.log(globalThis.rand);

    const Random = () => {
        setid(globalThis.rand)
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
                <Searchbar selectRadius={selectRadius} />
            </Box>
            <Box px={2} h={"100%"} pb={6} pt={2}>
                {property.map((e1) => {
                    return (
                        <>
                            <Box py={5} >
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

                            }}>
                                <Icon as={AiOutlineLike} w={12} h={12} />
                            </Button>
                        </Box>

                        <Box>
                            <Button onClick={() => {
                                plusId()
                                Nope()
                                // navigate(`/restaurant/${"000" + (globalThis.respage == 6 ? 1 : globalThis.respage + 1)}`)
                                setnextres(!nextres)
                            }} colorScheme="red" width="80px" h="80px" borderRadius={"full"}>

                                <Icon as={AiOutlineDislike} w={12} h={12} />

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
                                        <Button colorScheme="blue" mr={3} onClick={() => {
                                            Random()
                                            getRandom(globalThis.rand)
                                        }
                                        }
                                            borderRadius={"5px"}>
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
                </Container>
            </Box>
        </AppBody>
    )
}

export default LikeorNope
