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
} from "@chakra-ui/react"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import ShowImage from "../../components/restaurant/ShowImage"
import { Restaurant } from "./data/restaurant"
import { Link, useNavigate, useParams } from "react-router-dom"
import API from "src/function/API"
declare global {
    var respage: number, rand: number
}
function LikeorNope() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [count, setcount] = React.useState(1)
    const params = useParams()
    const [property, setproperty] = React.useState<any>([]);
    const [check, setcheck] = useState(false);
    const navigate = useNavigate()
    // const property = Restaurant.filter((e1) => {
    //     return e1.id == parseInt(params.id + "")
    // })

    const [res, setres] = React.useState(parseInt(params.id + ""))

    useEffect(() => {
        API.get("/restaurant/" + params.id)
            .then((item) => setproperty(item.data))
            // .catch((err) => on())
            // .finally(off)
            
    }, [check])
    console.log(property);
    console.log(params.id);
    
    const Nope = () => {
        if (res < Restaurant.length - 1) {
            setres(res + 1)
        } else {
            setres(0)
        }
        setcount(count + 1)
        if (count % 5 == 0) {
            return onOpen()
        }
        if(check == false) {
        setcheck(true)
    }else{
        setcheck(false)
    }
    }
    console.log(check);
    

    globalThis.respage = res
    globalThis.rand = Math.floor(Math.random() * 10)
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
                {property.map((e1:any) => {
                    return (
                        <>
                            <Box py={5} h="20px" mb={"40px"}>
                                <Heading textAlign={"center"} color={"#E65300"}>
                                    {e1.resName}{" "}
                                </Heading>
                            </Box>
                            <ShowImage img={e1.img} />
                        </>
                    )
                })}
            
                <Container>
                    <Flex flexDirection={"row"} justifyContent={"space-around"} justifyItems={"center"} mt={6}>
                        <Box>
                            <Button colorScheme="green" width="80px" h="80px" borderRadius={"full"}>
                                <Link to={`/restaurant/detail/${globalThis.respage}`}>
                                    <AiOutlineLike size={"xl"} />
                                </Link>
                            </Button>
                        </Box>

                        <Box>
                            <Button onClick={Nope} colorScheme="red" width="80px" h="80px" borderRadius={"full"}>
                                <Link to={`/restaurant/${globalThis.respage == Restaurant.length - 1 ? 0 : globalThis.respage + 1}`}>
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
                                        <Button colorScheme="blue" mr={3} onClick={Random} borderRadius={"5px"}>
                                            <Link to={`/restaurant/detail/${rand}`}>Random</Link>
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
