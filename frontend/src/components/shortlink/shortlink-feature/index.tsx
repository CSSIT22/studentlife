import { Box, Button, Center, Heading, Link, StackDivider, VStack } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../share/app/AppBody"
 
const shortlink = () =>{
    return(
        <AppBody>
            <Center> <Box width={"80%"} height={"500px"} background={"#D9D9D9"} borderRadius="20px" marginTop={"10%"}>
            <Box>
            <Heading  width={"300px"} height={"50px"} marginLeft={"10%"} marginTop={"-5"} background={"#f2f2f2"} borderRadius={"10px"} fontSize={"xl"} border={"3px solid white"} textAlign={"center"}>SHORTLINK FEATURE</Heading>    
            </Box>
            
<VStack spacing={4} align='stretch' marginTop={"10%"}>
    <Box h='70px' >
        <Box width={"100%"} >
            
        <Center><Button colorScheme='yellow' w={'50%'} height={"60px"} >SHORTLINK CUSTOMIZE</Button></Center>
        </Box>
        
    </Box>
    <Box h='70px' > 
        <Center>
            <Button colorScheme='green' w={'50%'} height={"60px"}>SHORTLINK GENERATOR</Button></Center>
    </Box>
    <Box h='70px' >
        <Center><Button colorScheme='linkedin' w={'50%'} height={"60px"}>SHORTLINK HISTORY</Button></Center>
    </Box>
</VStack>
</Box></Center>
            
        </AppBody>
    )
}
export default shortlink

