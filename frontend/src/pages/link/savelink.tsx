import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Heading, Input, Button, Box, Text, Link, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"
import { useState } from "react"

const savelink = () => {
    const toast = useToast()
    const [link, setLink] = useState("")
    const [generated, setGenerated] = useState("")
    const navigate = useNavigate()
    const allLink = () => {
        navigate("/link/allLink")

    }
    const generateLink = async () => {
        const response = await API.post("http://localhost:8000/shortlink/generate", { originalLink: link }) //axios will call Http
        setGenerated(response.data.result.shortenLink)
        // console.log(response.data)
    }
    return (
        <AppBody>
            <Container borderWidth="1px" padding="10" borderRadius="xl" background={"white"} gap={2} >
                <Box
                    width={"200px"}
                    height={"40px"}
                    marginLeft={"-30"}
                    marginTop={"-50"}
                    background={"orange.200"}
                    borderRadius={"10px"}
                    fontSize={"md"}
                    border={"3px solid white"}
                    textAlign={"center"}
                    textColor="white"
                >
                    <Text as={"b"}>SAVELINK FEATURE</Text>
                </Box>
                <br />
                <Input placeholder="link url:" onChange={(e) => setLink(e.target.value)} w={"100%"} height={"50px"} border={"4px"} borderColor={"black"} />
                <Box>
                    <br />
                    <Button
                        bg={"green.400"}
                        w={"100%"}
                        rounded={"xl"}
                        onClick={generateLink}
                    >
                        Save
                    </Button>
                </Box>

                <br />

                <Button width={"100%"} rounded={"xl"} bg={"orange.400"} onClick={allLink}>
                    All Links
                </Button>
            </Container>
        </AppBody>
    )
}
export default savelink
