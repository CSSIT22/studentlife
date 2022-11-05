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
    
} from "@chakra-ui/react"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import ExtarSecondaryNav from "../../components/share/navbar/ExtarSecondaryNav"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { BiBorderRadius } from "react-icons/bi"

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
            {/* Like or nope */}
            {/* <Searchbar /> */}
            {/* <br /> */}

            {/* <Heading textAlign={"center"}> Restaurant name</Heading> */}
            {/* <br /> */}
            {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/800px-Tom%27s_Restaurant%2C_NYC.jpg?20170523012006"
                width={"auto"}
                height={"auto"}
            ></img> */}

            <VStack spacing={6} align="stretch">
                <Box>
                    <Searchbar />
                </Box>
                <Box h="40px">
                    <Heading textAlign={"center"}> Restaurant name</Heading>
                </Box>
                <Box h="auto">
                    <Center>
                        <Image
                            borderRadius='3xl'
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/800px-Tom%27s_Restaurant%2C_NYC.jpg?20170523012006"
                            width={"auto"}
                            height={"auto"}
                            
                        ></Image>
                    </Center>
                </Box>
                <br />
                <br />
                <br />
                <br />
                <Box h="40px" rowGap={"100px"}>
                    <Flex marginLeft={"40px"} marginRight={"40px"}>
                        <Box>
                            <Button colorScheme="green" size="lg" borderRadius={"md"}>
                                <AiOutlineLike />
                            </Button>
                        </Box>
                        <Spacer />
                        <Box>
                            <Button colorScheme="red" size="lg" borderRadius={"md"}>
                                <AiOutlineDislike />
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </VStack>
        </AppBody>
    )
}

export default likeOrNope
