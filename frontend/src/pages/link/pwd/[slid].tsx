import { useState, useMemo } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import API from "src/function/API";
import { useLocation, useParams } from "react-router-dom";

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
            <Flex width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                <Flex width="40vw" height="40vh" border="2px solid black" justifyContent={"center"} alignItems={"center"} >
                    <Box>
                        <label>Enter Password: <br /></label>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} border={"4px"} borderColor={"black"}
                            backgroundColor={"white"}
                            textColor="black" />
                        <Button onClick={handleSubmit} bg={"#E68E5C"} marginTop="1rem">Submit</Button>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default EnterPassword;