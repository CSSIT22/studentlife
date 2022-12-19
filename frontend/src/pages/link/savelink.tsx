import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Heading, Input, Button, Box, Text, Link, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"
import { useState } from "react"
import { motion } from "framer-motion"

const savelink = () => {
    const toast = useToast()
    const [link, setLink] = useState("")
    const [generated, setGenerated] = useState("")
    const navigate = useNavigate()
    const allLink = () => {
        navigate("/link/allLink")

    }
    const generateLink = async () => {
        const response = await API.post("/shortlink/funcsavelink", { title: link }) //axios will call Http
        setGenerated(response.data.result.savelink)
        console.log(response.data)
    }
    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} border={"4px"}
                    borderColor={"green"} background={"white"} borderRadius="20px"
                    marginTop={"10%"} textColor="black" >
                    <Box>
                        <Heading
                            width={{ base: "200px", md: "300px" }}
                            height={{ base: "2rem", md: "2rem" }}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"white"}
                            borderRadius={"10px"}
                            fontSize={{ base: "sm", md: "xl" }}
                            border={"3px solid green"}
                            textAlign={"center"}
                            alignSelf={"center"}
                            color={"green"}
                        >
                            SAVELINK
                        </Heading>
                    </Box>
                    <Center flexDirection={"column"} p={"7"}>

                    <br />
                    <Input placeholder="link url:" onChange={(e) => setLink(e.target.value)} w={"70%"} height={"40px"} border={"4px"} borderColor={"black"} />
                    <Box>
                        <br />
                        <motion.div whileHover={{ scale: 0.9 }}
                            onHoverStart={e => { }}
                            onHoverEnd={e => { }}>
                            <Button
                                bg={"green.400"}
                                w={"5rem"}
                                rounded={"xl"}
                                onClick={generateLink}
                            >
                                Save
                            </Button></motion.div>
                    </Box>

                    <br />
                    <motion.div whileHover={{ scale: 0.9 }}
                        onHoverStart={e => { }}
                        onHoverEnd={e => { }}>

                        <Button width={"10rem"} rounded={"xl"} bg={"orange.400"} onClick={allLink} mb={"1rem"}>
                            All Links
                        </Button></motion.div></Center>
                </Box>
            </Center>
        </AppBody>
    )
}
export default savelink

