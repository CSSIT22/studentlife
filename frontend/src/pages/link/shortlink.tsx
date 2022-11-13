import { Box, Button, Center, Heading, Link, StackDivider, VStack, Text } from "@chakra-ui/react"
import React from "react"
import AppBody from "src/components/share/app/AppBody"
 
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
            
        <Link href={"http://127.0.0.1:5174/link/customize"}><Center><Button bg={"orange.200"} w={'50%'} height={"60px"} ><Text as={"b"}>SHORTLINK CUSTOMIZE</Text></Button></Center></Link>
        </Box>
        
    </Box>
    <Box h='70px' > 
        <Link><Center><Button bg={"orange.200"}  w={'50%'} height={"60px"}><Text as={"b"}>SHORTLINK GENERATOR</Text></Button></Center></Link>
    </Box>
    <Box h='70px' >
    <Link><Center><Button bg={"orange.200"}  w={'50%'} height={"60px"}><Text as={"b"}>SHORTLINK HISTORY</Text></Button></Center></Link>
    </Box>
</VStack>
</Box></Center>
            
        </AppBody>
    )
}
export default shortlink
