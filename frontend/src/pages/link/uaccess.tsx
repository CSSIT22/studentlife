import { SearchIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Center, Checkbox, extendTheme, Flex, Grid, GridItem, Heading, HStack, IconButton, Input, Link, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserList from "src/components/group/UserList"

import AppBody from "src/components/share/app/AppBody"


const UserAc = () => {
   
        const navigate = useNavigate()
        const complete = () => {
            navigate("/link/complete")
        }
    return (
        <AppBody>
            <Center> <Box width={"80%"} height={"500px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"10%"}>
                <Box>
                    <Heading width={"300px"} height={"50px"} marginLeft={"10%"} marginTop={"-5"} background={"#f2f2f2"} borderRadius={"10px"} fontSize={"xl"} border={"3px solid white"} textAlign={"center"}>SHORTLINK PERMISSION</Heading>
                </Box>
                <VStack spacing={4} align='stretch' marginTop={"10%"}>
                    <Center>
                        <Box w='90%' p={4} color='white' alignItems={"center"}>
                            
                            
                            <HStack spacing='24px'>
                            <Avatar name='Kitibhum Supanurat' src='https://bit.ly/broken-link' />
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Kitibhum Supanurat</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} borderColor={"black"}><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>
                            <HStack spacing='24px' marginTop={"5%"}>
                            <Avatar name='Ratchanon Kondee' src='https://bit.ly/broken-link' />
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Ratchanon Kondee</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} ><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>
                            <HStack spacing='24px' marginTop={"5%"}>
                            <Avatar name='Passapol PK' src='https://bit.ly/broken-link' />
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Passapol PK</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} ><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>
                            <HStack spacing='24px' marginTop={"5%"}>
                            <Avatar name='Nattapat Medtoe' src='https://bit.ly/broken-link' />
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Nattapat Medtoe</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} ><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>
                            <Box >
                            <Button bg={"orange.200"} w={"100%"} height={"60px"} onClick={complete}>
                                                <Text as={"b"}>Save</Text>
                            </Button>
                            </Box>
                            </Box>
                            <hr></hr>
                        </Center>

                    </VStack>
                </Box>
            
            </Center>

         </AppBody>
    )
}
export default UserAc