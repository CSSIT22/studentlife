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
    
} from "@chakra-ui/react"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"


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

            <VStack spacing={10} align="stretch">
                <Box>
                    <Searchbar />
                </Box>
                <Box h="20px">
                    <Heading textAlign={"center"}> Restaurant name</Heading>
                </Box>
                <Box h="auto" >
                    <Center>
                        <Image
                            borderRadius='3xl'
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/800px-Tom%27s_Restaurant%2C_NYC.jpg?20170523012006"
                            width={"auto"}
                            height='400px'
                            
                        ></Image>
                    </Center>
                </Box>

                <Box h="60px" >
                    <Flex>
                        <Box marginLeft='40px' >
                            <Button colorScheme="green"  width='80px' h='80px' borderRadius={"full"}>
                                <Link href="/restaurant/detail"><AiOutlineLike size={'xl'}/></Link>
                            </Button>
                        </Box>
                        <Spacer />
                        
                            <>
                            <Button onClick={onOpen} colorScheme="red" width='80px' h='80px' borderRadius={"full"} marginRight='40px'><AiOutlineDislike size={'xl'} /></Button>

                            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                                <ModalOverlay />
                                <ModalContent textAlign={'center'}>
                                <ModalHeader fontWeight='800' fontSize={'35px'}>Random Time!!!

                                </ModalHeader>
                                    <VStack spacing={3} pt='30px'>
                                        <Text fontSize={'20px'} fontWeight='500'>Can not choose the restaurant?</Text>
                                    
                                        <Text fontSize={'20px'} fontWeight='500'>Do you want to random the restaurant</Text>
                                    </VStack>
                                <ModalCloseButton />
                                <ModalFooter justifyContent={'center'} pt='60px'>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Random
                                    </Button>
                                    <Button colorScheme='red' mr={3} onClick={onClose}>
                                    Cancel
                                    </Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                            </>
                        
                        
  
                    </Flex>
                </Box>
            </VStack>
        </AppBody>
    )
}

export default likeOrNope
