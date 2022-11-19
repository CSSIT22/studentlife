import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Heading, Input, Button, Box, Text } from "@chakra-ui/react"
const savelink = () =>{
    return <AppBody>
       <Container borderWidth="1px" padding="10" borderRadius="xl" background={"white"} gap={2} >
       <Box width={"200px"} height={"40px"} marginLeft={"-30"} marginTop={"-50"} background={"#f2f2f2"} borderRadius={"10px"} 
       fontSize={"md"} border={"3px solid white"} textAlign={"center"} >
            <Text as ={"b"}>SAVELINK FEATURE</Text>    
       </Box>
        <br/>
        <Input placeholder='link url:' />
        <Box>
        <br/>
        <Button width={"100%"} rounded={"xl"} bg={"orange.200"}>Save</Button>    
        </Box>
        <br/>
        <Button width={"100%"} rounded={"xl"} bg={"orange.200"}>All Links</Button>  
        </Container> 
    </AppBody>
}
export default savelink;