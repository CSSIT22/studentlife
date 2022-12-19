import { useState, useMemo } from "react";
import { Box, Flex, Input, Button, Center } from "@chakra-ui/react";
import API from "src/function/API";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion"


const EnterPassword = () => {
    const [password, setPassword] = useState<any>()

    const param = useParams()
    function handleSubmit() {
        console.log(param);

        API.post(`/shortlink/checkpassword`, {
            data: {
                password: password,
                shorten: param.slid
            }
        }).then(((res) => window.location.href = res.data.link)).catch(() => alert("Wrong password or link not found"))
        setPassword("")
    }

    return (
        <>
            <Box width={"80%"} height={"500px"} background={"white"} borderRadius="20px" border="2px solid orange" marginTop={"10%"} mx={"4rem"} >
                <Center>
                    <Flex width="40vw" height="40vh" justifyContent={"center"} alignItems={"center"} >
                        <Box>
                            <label>Enter Password: <br /></label>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} border={"4px"} borderColor={"black"}
                                backgroundColor={"white"}
                                textColor="black" />
                                <motion.div whileHover={{ scale: 0.9 }}
                            onHoverStart={e => { }}
                            onHoverEnd={e => { }}>
                            <Button onClick={handleSubmit} bg={"orange"} marginTop="1rem">Submit</Button>
                            </motion.div>
                        </Box>
                    </Flex>
                </Center>
            </Box>

        </>
    )
}

export default EnterPassword;