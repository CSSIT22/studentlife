import AppBody from "../../components/share/app/AppBody";
import React from "react";
import { Box, Button, Container, Heading, Input } from "@chakra-ui/react";
const shortlink = () =>{
    return <AppBody>
           <Container borderWidth="1px" padding="10" borderRadius="xl" background={"white"} gap={2}>
        <Heading>Shortlink</Heading>
        <br/>
        <Box>
        <br/>
        <Button width={"100%"} rounded={"xl"} bg={"orange.200"}>Shortlink Customize</Button>    
        </Box>
        <Box>
        <br/>
        <Button width={"100%"} rounded={"xl"} bg={"orange.200"}>Shortlink Generate</Button>    
        </Box>
        <br/>
        <Button width={"100%"} rounded={"xl"} bg={"orange.200"}>Shortlink History</Button>  
        </Container> 
        </AppBody>
}
export default shortlink