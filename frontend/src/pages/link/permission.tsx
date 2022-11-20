import { Box, Button, Center, Checkbox, Grid, GridItem, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react"

import AppBody from "src/components/share/app/AppBody"
import User from "./data/user"

const Permission = () => {

    return (
        <AppBody>
            <Center> <Box width={"80%"} height={"500px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"10%"}>
                <Box>
                    <Heading width={"300px"} height={"50px"} marginLeft={"10%"} marginTop={"-5"} background={"#f2f2f2"} borderRadius={"10px"} fontSize={"xl"} border={"3px solid white"} textAlign={"center"}>SHORTLINK PERMISSION</Heading>
                </Box>

                <VStack spacing={4} align='stretch' marginTop={"10%"}>
                    <Center>
                        <Box w='90%' p={4} color='white' alignItems={"center"}>
                            {/* <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                                <GridItem colSpan={0} h='10' bg='tomato' /><Heading>Kitibhum Supanurat</Heading>
                                <GridItem colStart={5} colEnd={6} h='10' bg='papayawhip' />
                            </Grid> */}

                            <HStack spacing='24px'>
                                <Box w='50px' h='10'  >USER</Box>
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Kitibhum Supanurat</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} ><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>
                            <HStack spacing='24px' marginTop={"5%"}>
                                <Box w='50px' h='10'  >USER</Box>
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Kitibhum Supanurat</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} ><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>
                            <HStack spacing='24px' marginTop={"5%"}>
                                <Box w='50px' h='10'  >USER</Box>
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Kitibhum Supanurat</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} ><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>
                            <HStack spacing='24px' marginTop={"5%"}>
                                <Box w='50px' h='10'  >USER</Box>
                                <Box w='400px' h='10' ><Heading color={"black"}>
                                    <Text fontSize='2xl'>Kitibhum Supanurat</Text></Heading></Box>
                                <Box w='180px' h='10' marginTop={"30px"} ><Checkbox defaultChecked></Checkbox></Box>
                            </HStack>
                            <hr></hr>

                        </Box>
                        <hr></hr>
                    </Center>

                </VStack>
            </Box></Center>

        </AppBody>
    )
}
export default Permission