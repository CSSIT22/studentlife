import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Heading, Input, Button, Box } from "@chakra-ui/react"
const savelink = () =>{
    return <AppBody>
       <Container borderWidth="1px" padding="10" borderRadius="xl" background={"white"} gap={2}>
        <Heading>Savelink</Heading>
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